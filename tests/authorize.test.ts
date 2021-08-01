import {
    Token,
    createState,
    authorizeToken,
    getToken,
    // createCode,
} from '../src/authorize'
import { token as globalToken } from './global'
import { any } from './objects'

const clientId = process.env.CLIENT_ID!
// const clientSecret = process.env.CLIENT_SECRET!
const redirectUri = 'http://localhost:5050/callback'
const state = createState()

const testToken: Token = {
    access_token: any(String),
    token_type: 'Bearer',
    expires_in: any(Number),
}

// const camelToSnake = (key: string) =>
//     key.replace(/[A-Z]/g, ($1) => `_${$1.toLowerCase()}`)

const snakeToCamel = (key: string) =>
    key.replace(/_[a-z]/g, ($1) => $1.toUpperCase().replace('_', ''))

describe(authorizeToken, () => {
    test.concurrent('Basic call', () => {
        const options: Parameters<typeof authorizeToken>[0] = {
            clientId: clientId,
            redirectUri: redirectUri,
            showDialog: true,
            state: state,
        }
        const redirect = jest.fn((_: string) => {})

        authorizeToken(options, redirect)

        expect(redirect).toBeCalledTimes(1)

        const search = new URL(redirect.mock.calls[0][0]).search.slice(1)
        const params: { [key: string]: any } = {}
        for (const param of search.split('&')) {
            const [key, value] = param.split('=')
            params[snakeToCamel(key)] = decodeURIComponent(value)
        }
        expect(params).toHaveProperty('showDialog', 'true')
        params.showDialog = true

        expect(params).toStrictEqual({
            responseType: 'token',
            ...options,
        })
    })

    test.concurrent('Scopes', () => {
        const scopes: Parameters<typeof authorizeToken>[0]['scopes'] = [
            'app-remote-control',
            'user-library-modify',
            'user-read-playback-state',
        ]
        const redirect = jest.fn((_: string) => {})

        authorizeToken(
            {
                clientId: clientId,
                redirectUri: redirectUri,
                scopes: scopes,
            },
            redirect
        )

        const searchParams = new URL(redirect.mock.calls[0][0]).searchParams

        expect(searchParams.has('scope')).toBeTruthy()
        expect(searchParams.get('scope')).toBe(scopes.join())
    })
})

describe.only(getToken, () => {
    const params = {
        access_token: globalToken,
        token_type: 'Bearer',
        expires_in: '3600',
    }
    const hashFrom = (obj: { [key: string]: string }) =>
        '#' + new URLSearchParams(obj).toString()

    test.concurrent('Basic call', () => {
        const token = getToken(undefined, hashFrom(params))
        expect(token).toStrictEqual(testToken)
    })

    test.concurrent('Using state', () => {
        const token = getToken(
            state,
            hashFrom({
                ...params,
                state: state,
            })
        )
        expect(token).toStrictEqual(testToken)
    })
})
