import { SpotifyError, AuthenticationError } from './error'
import fetch from 'node-fetch'

export interface Token {
    accessToken: string
    tokenType: 'Bearer'
    expiresIn: number
}

interface AuthorizeParams {
    clientID: string
    clientSecret: string
}

export async function authorize(params?: AuthorizeParams): Promise<Token> {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${clientID}:${clientSecret}`
            ).toString("base64")}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials'),
    })
    if (res.status === 200) return (await res.json()) as Token
    else {
        try {
            throw new SpotifyError(await res.json() as AuthenticationError)
        } catch (error) {
            if (error instanceof SpotifyError) throw error
            else throw new SpotifyError('Uknown error during authorization.', 'unknown', error)
        }
    }
}
