import { sendRequest } from '../global'
import type { Token, Responses } from 'spotify-objects'

/**
 * Get detailed profile information about the current user (including the current user’s username).
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the current user.<br>Reading the user’s email address requires the `user-read-email` scope; reading country, product subscription level and explicit content settings requires the `user-read-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @returns A {@link PrivateUserObject user object}.<br>**Important!** If the `user-read-email` scope is authorized, the returned JSON will include the email address that was entered when the user created their Spotify account. **This email address is unverified**; do not assume that the email address belongs to the user.
 */
export async function getCurrentUserProfile(
    token: Token | string
): Promise<Responses.getCurrentUserProfile> {
    return await (
        await sendRequest({
            endpoint: 'me',
            method: 'GET',
            token: token,
        })
    ).json()
}

/**
 * Get public profile information about a Spotify user.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param userId - The user’s [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
 * @returns A {@link PublicUserObject user object}.
 */
export async function getUserProfile(
    token: Token | string,
    userId: string
): Promise<Responses.getUserProfile> {
    return await (
        await sendRequest({
            endpoint: 'users/{user_id}',
            method: 'GET',
            token: token,
            pathParameter: { user_id: userId },
        })
    ).json()
}
