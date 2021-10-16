import { SpotifyError } from '../error'
import { paramsFromHash, fetchToken, redirectTo } from './global'
import type { RefreshToken, Scope } from 'spotify-objects'

interface AuthorizeRefreshTokenOptions {
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

interface AuthorizeRefreshTokenWithPKCEOptions
    extends Omit<AuthorizeRefreshTokenOptions, 'show_dialog'> {
    /** See [Spotify's authorization guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/#1-create-the-code-verifier-and-challenge) */
    codeChallenge: string
}

/**
 * This is step 1 of authorization using the [Authorization Code Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow) or the [Authorization Code Flow With PKCE](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce). It redirects to a page for the use to login and authorize your application. After accepting or denying authorization, the user with be redireted to the `redirectUri`.
 * @param options - The info necessary for authorization.
 * @param redirect - Allows for more complex redirection to the authorization url incase `location` is not available.
 */
export function authorizeRefreshToken(
    options:
        | AuthorizeRefreshTokenOptions
        | AuthorizeRefreshTokenWithPKCEOptions,
    redirect?: (url: string) => void
): void {
    const query: { [key: string]: string } = {
        client_id: options.clientId,
        redirect_uri: options.redirectUri,
        response_type: 'code',
    }

    if (options.state) query.state = options.state
    if (options.scopes) query.scope = options.scopes.join()

    if ('showDialog' in options && options.showDialog)
        query.show_dialog = options.showDialog.toString()
    else if ('codeChallenge' in options && options.codeChallenge) {
        query.code_challenge_method = 'S256'
        query.code_challenge = options.codeChallenge
    }

    const url = new URL('https://accounts.spotify.com/authorize')
    for (const key in query) {
        url.searchParams.set(key, query[key])
    }

    redirectTo(url.href, redirect)
}

interface GetRefreshTokenOptions {
    /** The client ID provided to you by Spotify when you register your application. Available from the [Developer Dashboard](https://developer.spotify.com/dashboard/). */
    clientId: string
    /** The client secret provided to you by Spotify when you register your application. Available from the [Developer Dashboard](https://developer.spotify.com/dashboard/). */
    clientSecret: string
    /** This parameter is used for validation only (there is no actual redirection). The value of this parameter must exactly match the value of `redirectUri` supplied when requesting the authorization code. */
    redirectUri: string
    /** The state value from `authorizeRefreshToken`. */
    state?: string
}
interface GetRefreshTokenWithPKCEOptions
    extends Omit<GetRefreshTokenOptions, 'clientSecret'> {
    /** The value of this parameter must match the value of the `codeVerifier` that was generated alongside `codeChallenge` */
    codeVerifier: string
}

export async function getRefreshToken(
    options: GetRefreshTokenOptions | GetRefreshTokenWithPKCEOptions,
    hash?: Location['hash']
): Promise<RefreshToken> {
    const hashParams = paramsFromHash(hash ,options.state)

    if (!hashParams.code)
        throw new SpotifyError('No code value found.', 'getToken')

    const init: Parameters<typeof fetchToken>[0] = {}

    init.body = {
        client_id: options.clientId,
        grant_type: 'authorization_code',
        code: hashParams.code,
        redirect_uri: options.redirectUri,
    }

    if ('clientSecret' in options) init.body.client_secret = options.clientSecret
    else init.body.code_verifier = options.codeVerifier

    return await fetchToken(init)
}
