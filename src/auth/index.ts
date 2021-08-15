export * from './refreshToken'
export * from './getToken'
import _createCode from 'pkce-challenge'

/** Scopes enable your application to access specific API endpoints on behalf of a user. The set of scopes you pass in your call determines the access permissions that the user is required to grant. */
export type Scope =
    | 'ugc-image-upload'
    | 'user-read-recently-played'
    | 'user-top-read'
    | 'user-read-playback-position'
    | 'user-read-playback-state'
    | 'user-modify-playback-state'
    | 'user-read-currently-playing'
    | 'app-remote-control'
    | 'streaming'
    | 'playlist-modify-public'
    | 'playlist-modify-private'
    | 'playlist-read-private'
    | 'playlist-read-collaborative'
    | 'user-follow-modify'
    | 'user-follow-read'
    | 'user-library-modify'
    | 'user-library-read'
    | 'user-read-email'
    | 'user-read-private'

export interface Token {
    /** An access token that can be provided in subsequent calls, for example to Spotify Web API services. */
    access_token: string
    /** How the access token may be used. */
    token_type: 'Bearer'
    /** The time period (in seconds) for which the access token is valid. */
    expires_in: number
}

export function createCode() {
    const lng = Math.floor(Math.random() * (128 - 43)) + 43
    return _createCode(lng)
}

export function createState() {
    const lng = Math.floor(Math.random() * (32 - 24)) + 24
    // prettier-ignore
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'.split('')
    let str = ''
    for (var i = 0; i < lng; i++)
        str += chars[Math.floor(Math.random() * chars.length)]
    return str
}
