import {
    createState,
    createCode,
} from '../../src'

export type Unwrap<T> = T extends Promise<infer U> ? U : T

export const token = process.env.ACCESS_TOKEN!
export const albumIDs = ['7gsWAHLeT0w7es6FofOXk1', '13dXX35pYjr8FqRla40K2a']
export const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']
export const categoryIDs = ['party']
export const episodeIds = ['12KkLKHryOF9tvBuHsiHwS', '6qAXNDd2RhdZVeRRLcngzo']
export const playlistIDs = ['6innvmsboMZC5rdrmY292j']
export const showIDs = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']
export const trackIds = ['3WWAvWDBQANpJeNbvVbjMg', '0TXK1dsiK9lkeaK6neSP2j']
export const userIDs = ['spotify']

export const clientId = process.env.CLIENT_ID!
export const clientSecret = process.env.CLIENT_SECRET!
export const refreshToken = process.env.REFRESH_TOKEN!
export const redirectUri = 'http://localhost:5050/callback'
export const state = createState()
export const code = createCode()
export const scopes: Scope[] = [
    'app-remote-control',
    'user-library-modify',
    'user-read-playback-state',
]
export const testToken: Omit<Token, 'scope'> = {
    access_token: token,
    expires_in: 3600,
    token_type: 'Bearer',
}
export const testRefreshToken: RefreshToken = {
    ...testToken,
    refresh_token: refreshToken,
}

export const camelToSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, ($1) => `_${$1.toLowerCase()}`)

/** Parse an parameters from hash */
export function paramsFromBody(body: string) {
    // get obj from hash
    const hashObj: { [key: string]: string } = {}
    for (const param of body.split('&')) {
        const [_key, value] = param.split('=')
        const key = _key.replace(/_[a-z]/g, ($1) =>
            $1.toUpperCase().replace('_', '')
        )
        hashObj[key] = decodeURIComponent(value)
    }
    return hashObj
}

import params from './params'
export { params }