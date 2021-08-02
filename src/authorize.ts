import { SpotifyError, AuthenticationError } from './error'
import fetch from 'node-fetch'

export interface Token {
    access_token: string
    token_type: 'Bearer'
    expires_in: number
}

export async function authorize(props: { clientID: string, clientSecret: string}): Promise<Token> {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${props.clientID}:${props.clientSecret}`
            ).toString("base64")}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials'),
    })
    if (res.status === 200) return (await res.json()) as Token
    else {
        try {
            const authError = await res.json() as AuthenticationError
            if ('error_description' in authError)
                throw new SpotifyError(authError.error_description, 'token')
            else throw authError
        } catch (error) {
            if (error instanceof SpotifyError) throw error
            else throw new SpotifyError('Uknown error during authorization.', 'unknown', error)
        }
    }
}
