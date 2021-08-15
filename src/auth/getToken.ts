import { Token, Scope } from '.'
import { SpotifyError } from '../error'
import { paramsFromHash, fetchToken, redirectTo } from './global'
// @ts-ignore (used in tsComment @link)
import type { getRefreshToken } from './refreshToken'

interface ImplicitGrantParams {
    /** The client ID provided to you by Spotify when you register your application. Available from the [Developer Dashboard](https://developer.spotify.com/dashboard/). */
    clientId: string
    /** The URI to redirect to after the user grants/denies permission. This URI needs to be entered in the URI whitelist that you specify when you register your application. */
    redirectUri: string
    /** The state can be useful for correlating requests and responses. Because your redirect_uri can be guessed, using a state value can increase your assurance that an incoming connection is the result of an authentication request. If you generate a random string or encode the hash of some client state (e.g., a cookie) in this state variable, you can validate the response to additionally ensure that the request and response originated in the same browser. This provides protection against attacks such as cross-site request forgery. See [RFC-6749](http://tools.ietf.org/html/rfc6749#section-10.12). */
    state?: string | undefined
    /** A space-separated list of {@link Scope scopes}. */
    scopes?: Scope[]
    /** Whether or not to force the user to approve the app again if they’ve already done so. If false (default), a user who has already approved the application may be automatically redirected to the URI specified by `redirect_uri`. If true, the user will not be automatically redirected and will have to approve the app again. */
    showDialog?: boolean
}
/**
 * @param options The info necessary to get a {@link Token}.
 * @param redirect Allows for more complex redirection to the authorization url incase `location` is not available.
 */
export async function authorizeToken(
    options: ImplicitGrantParams,
    redirect?: (url: string) => void
) {
    const url = new URL('https://accounts.spotify.com/authorize')
    url.searchParams.set('response_type', 'token')
    url.searchParams.set('client_id', options.clientId)
    url.searchParams.set('redirect_uri', options.redirectUri)
    if (options.state) url.searchParams.set('state', options.state)
    if (options.scopes) url.searchParams.set('scope', options.scopes.join())
    if (options.showDialog)
        url.searchParams.set('show_dialog', options.showDialog.toString())

    redirectTo(url.href, redirect)
}

interface TokenFromRefreshToken
    extends Omit<ClientCredentials, 'clientSecret'>,
        Partial<Pick<ClientCredentials, 'clientSecret'>> {
    /** The refresh token returned from the authorization code exchange. */
    refreshToken: string
}

interface ClientCredentials {
    /** The client ID provided to you by Spotify when you register your application. Available from the [Developer Dashboard](https://developer.spotify.com/dashboard/). */
    clientId: string
    /** The client secret provided to you by Spotify when you register your application. Available from the [Developer Dashboard](https://developer.spotify.com/dashboard/). */
    clientSecret: string
}

/**
 * Gets token using refresh token from {@link getRefreshToken}
 * @param params - The info necessary to get a {@link Token}.
 */
export function getToken(params: TokenFromRefreshToken): Promise<Token>

/**
 * Gets token using client credentials.
 * @param params - The info necessary to get a {@link Token}.
 */
export function getToken(params: ClientCredentials): Promise<Token>

/**
 * Gets token value after using {@link authorizeToken}
 * @param params - The info necessary to get a {@link Token}.
 * @param hash - Provide if `location` is unavailable.
 */
export function getToken(state?: string, hash?: string): Token

export function getToken(
    params?: TokenFromRefreshToken | ClientCredentials | string,
    hash?: string
): Token | Promise<Token> {
    if (!params || typeof params == 'string') {
        const token = paramsFromHash(hash, params)

        if (!(token.access_token || token.expires_in || token.token_type))
            throw new SpotifyError(
                "Token isn't available. Make sure to use the authorizeToken function first.",
                'getToken'
            )

        return {
            access_token: token.access_token,
            expires_in: parseInt(token.expires_in),
            token_type: token.token_type as 'Bearer',
        }
    } else {
        const init: Parameters<typeof fetchToken>[0]= {}

        if ('refreshToken' in params) {
            init.body = {
                grant_type: 'refresh_token',
                refresh_token: params.refreshToken
            }
        } else init.body = { grant_type: 'client_credentials' }

        if (params.clientSecret) {
            let auth = `${params.clientId}:${params.clientSecret}`
            auth = Buffer.from(auth).toString('base64')
            auth = 'Basic ' + auth
            init.headers = { Authorization: auth }
        } else init.body.client_id = params.clientId

        return fetchToken(init)
    }
}
