// @ts-check
const dotenv = require('dotenv')
const express = require('express');
const fetch = require('node-fetch').default;
const open = require('open')
const fs = require('fs')

// three possible states
// 1. client_id and client_secret only
// 2. has refresh_token but token is expired
// 3. token is valid

// load .env variables
dotenv.config()

// make sure client_id and client_state are defined
if (!('CLIENT_ID' in process.env && process.env.CLIENT_ID)) {
    console.error('Authentication Error! The .env file is missing a CLIENT_ID')
    process.exit(1)
} else if (!('CLIENT_SECRET' in process.env && process.env.CLIENT_SECRET)) {
    console.error('Authentication Error! The .env file is missing a CLIENT_SECRET')
    process.exit(1)
}


// 1. client_id and client_secret only
if (!('REFRESH_TOKEN' in process.env))
    getRefreshToken()
        .then(saveToEnv)
        .then(() => {
            console.log('Authorized!')
            process.exit(0)
        })

// 2. has refresh_token but token is expired
else if (
    !('EXPIRES_AT' in process.env) ||
    parseInt(process.env.EXPIRES_AT) < (new Date()).valueOf()
) getNewToken()
    .then(saveToEnv)
    .then(() => {
        console.log('Authorized!')
        process.exit(0)
    })

// 3. token is valid
else {
    console.log('Authorized!')
    process.exit(0)
}


/**
 * @typedef Token
 * @prop {String} access_token
 * @prop {String} token_type
 * @prop {String} scope
 * @prop {Number} expires_in
 */
/**
 * @typedef {Token & {refresh_token: String}} RefreshTokenResponse
 */

/**
 * Gets `refresh_token`
 * @returns {Promise<RefreshTokenResponse>}
 */
function getRefreshToken() {
    return new Promise(resolve => {
        const port = 8080
        const redirectUri = `http://localhost:${port}/callback`
        const app = express()

        app.get('/', (req, res) => {
            const url = new URL('https://accounts.spotify.com/authorize')
            url.searchParams.set('client_id', process.env.CLIENT_ID)
            url.searchParams.set('response_type', 'code')
            url.searchParams.set('redirect_uri', redirectUri)
            url.searchParams.set('scope', [
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
            ].join())
        
            res.redirect(url.href)
        })

        app.get('/callback', (req, res) => {
            const [baseUrl, queryStr] = req.originalUrl.split('?')
            if (!queryStr) {
                console.error('Authorization Error! Redirected to %s without authoizing', baseUrl)
                process.exit(1)
            }
        
            const query = {}
            for (const param of queryStr.split('&')) {
                const [key, value] = param.split('=')
                query[key] = value
            }
        
            if ('error' in query) {
                console.error(`Authoization Error! ${query.error}`)
                process.exit(1)
            }
        
            if (!('code' in query)) {
                console.error("Authoization Error! Couldn't find code for authorization\nquery: \O", query)
                process.exit(1)
            }

            postRequest({
                grant_type: 'authorization_code',
                code: query.code,
                redirect_uri: redirectUri
            }).then(resolve)

            res.redirect('/complete')
        })

        app.get('/complete', (req, res) => {
            res.status(200).send('<script>window.close()</script>')
            server.close()
        })
        
        const server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })

        open(`http://localhost:${port}`)
    })
}

/**
 * Gets an updates `token`
 * @returns {Promise<Token>}
 */
async function getNewToken() {
    return await postRequest({
        grant_type: 'refresh_token',
        refresh_token: process.env.REFRESH_TOKEN,
    })
}

/**
 * Send a the necessary `POST` request
 * @param {{ [key: string]: string }} body 
 */
async function postRequest(body) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Basic ${Buffer.from(
                `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
            ).toString("base64")}`,
        },
        method: 'POST',
        body: Object.entries(body)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
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

/**
 * Saves authorization data to `.env`
 * @param {Token | RefreshTokenResponse} value
 */
function saveToEnv(value) {
    delete value.scope

    const expiresAt = ((new Date()).valueOf() + value.expires_in * 1000)
    delete value.expires_in

    const envPath = './.env'
    try {
        const obj = dotenv.parse(fs.readFileSync(envPath))
        delete obj.ACCESS_TOKEN
        delete obj.TOKEN_TYPE
        delete obj.EXPIRES_AT
        const updatedData = Object.entries({
            ...obj,
            ...value,
            expires_at: expiresAt.valueOf()
        })
            .map(([key, value]) => `${key.toUpperCase()}=${value}`)
            .join('\n')

        fs.writeFileSync(envPath, updatedData)
    } catch (error) {
        console.error(`Authorization Error! ${error}`)
        process.exit(1)
    }

    return
}