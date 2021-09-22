import dotenv from 'dotenv'
import { createServer, RequestListener } from 'http'
import fetch from 'node-fetch'
import open from 'open'
import { readFileSync, writeFileSync } from 'fs'

export default async function authorize() {
    dotenv.config()
    // make sure client_id and client_state are defined
    if (!('CLIENT_ID' in process.env && process.env.CLIENT_ID)) {
        throw new Error(
            'Authentication Error! The .env file is missing a CLIENT_ID'
        )
    } else if (!('CLIENT_SECRET' in process.env && process.env.CLIENT_SECRET)) {
        throw new Error(
            'Authentication Error! The .env file is missing a CLIENT_SECRET'
        )
    }

    // 1. client_id and client_secret only
    if (!('REFRESH_TOKEN' in process.env)) {
        const refreshToken = await getRefreshToken()
        saveToEnv(refreshToken)
        return
    }

    // 2. has refresh_token but token is expired
    else if (
        !('EXPIRES_AT' in process.env) ||
        parseInt(process.env.EXPIRES_AT!) < new Date().valueOf()
    ) {
        const token = await getNewToken()
        saveToEnv(token)
        return
    }

    // 3. token is valid
    return
}

function getRefreshToken(): Promise<RefreshToken> {
    return new Promise((resolve) => {
        const host = 'localhost'
        const port = 8080
        const redirectUri = `http://${host}:${port}/callback`

        const requestListener: RequestListener = function (req, res) {
            const [path, query] = (req.url ?? '').split('?')

            switch (path) {
                case '/callback':
                    if (query && query == '') {
                        console.error(
                            'Authorization Error! Redirected to "%s" without authoizing',
                            req.url
                        )
                        process.exit(1)
                    }

                    const queryObj = parseQuery(query)

                    if ('error' in queryObj) {
                        console.error(`Authoization Error! ${queryObj.error}`)
                        process.exit(1)
                    }

                    if (!('code' in queryObj)) {
                        console.error(
                            "Authoization Error! Couldn't find code for authorization\nquery: O",
                            queryObj
                        )
                        process.exit(1)
                    }

                    postRequest({
                        grant_type: 'authorization_code',
                        code: queryObj.code,
                        redirect_uri: redirectUri,
                    }).then(resolve)

                    res.writeHead(200).end('<script>window.close()</script>')
                    server.close()

                    break

                default:
                    const url = new URL(
                        'https://accounts.spotify.com/authorize'
                    )
                    url.searchParams.set('client_id', process.env.CLIENT_ID!)
                    url.searchParams.set('response_type', 'code')
                    url.searchParams.set('redirect_uri', redirectUri)
                    url.searchParams.set(
                        'scope',
                        [
                            'ugc-image-upload',
                            'user-read-recently-played',
                            'user-top-read',
                            'user-read-playback-position',
                            'user-read-playback-state',
                            'user-modify-playback-state',
                            'user-read-currently-playing',
                            'app-remote-control',
                            'streaming',
                            'playlist-modify-public',
                            'playlist-modify-private',
                            'playlist-read-private',
                            'playlist-read-collaborative',
                            'user-follow-modify',
                            'user-follow-read',
                            'user-library-modify',
                            'user-library-read',
                            'user-read-email',
                            'user-read-private',
                        ].join()
                    )

                    res.writeHead(302, {
                        Location: url.href,
                    })

                    res.end()
                    break
            }
        }

        const server = createServer(requestListener)

        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`)
        })

        open(`http://${host}:${port}`)
    })
}

async function getNewToken(): Promise<Token> {
    return await postRequest({
        grant_type: 'refresh_token',
        refresh_token: process.env.REFRESH_TOKEN!,
    })
}

async function postRequest(body: { [key: string]: string }) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Basic ${Buffer.from(
                `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString('base64')}`,
        },
        method: 'POST',
        body: Object.entries(body)
            .map(([key, value]) => `${key}=${value}`)
            .join('&'),
    })
    if (response.ok) {
        return await response.json()
    } else {
        let msg
        try {
            msg = (await response.json()).error
        } catch {
            msg = 'Unable to send POST request.'
        }
        console.error(`Authorization error! ${msg}`)
        process.exit(1)
    }
}

function saveToEnv(value: Token | RefreshToken) {
    delete value.scope

    const expiresAt = new Date().valueOf() + value.expires_in * 1000
    // @ts-ignore
    delete value.expires_in

    const envPath = './.env'
    try {
        const obj = dotenv.parse(readFileSync(envPath))
        delete obj.ACCESS_TOKEN
        delete obj.TOKEN_TYPE
        delete obj.EXPIRES_AT
        const updatedData = Object.entries({
            ...obj,
            ...value,
            expires_at: expiresAt.valueOf(),
        })
            .map(([key, value]) => `${key.toUpperCase()}=${value}`)
            .join('\n')

        writeFileSync(envPath, updatedData)
    } catch (error) {
        console.error(`Authorization Error! ${error}`)
        process.exit(1)
    }

    return
}

function parseQuery(query: string) {
    const queryObj: { [key: string]: string } = {}
    for (const param of query.split('&')) {
        const [key, value] = param.split('=')
        queryObj[key] = value
    }
    return queryObj
}
