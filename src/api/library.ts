import { sendRequest } from '../request'
import type { Token } from '../authorize'
import type {
    PagingObject,
    AlbumObject,
    TrackObject,
    EpisodeObject,
    ShowObject,
} from './objects'

/**
 * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param {Object} [options]
 * @returns {Promise<PagingObject<AlbumObject>>} An array of saved {@link AlbumObject album objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getUsersSavedAlbums(
    token: Token | string,
    options?: {
        /** The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first object to return. Default: 0 (i.e., the first object). Use with `limit` to get the next set of objects. */
        offset?: number
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
    }
): Promise<PagingObject<AlbumObject>> {
    return await (
        await sendRequest({
            endpoint: 'me/albums',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Save one or more albums to the current user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function saveAlbumsforCurrentUser(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/albums',
            method: 'PUT',
            token: token,
            headers: { 'Content-Type': 'application/json' },
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Remove one or more albums from the current user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function removeAlbumsforCurrentUser(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/albums',
            method: 'DELETE',
            token: token,
            headers: { 'Content-Type': 'application/json' },
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the albums. Maximum: 50 IDs.
 * @returns {Promise<boolean[]>} An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export async function checkUsersSavedAlbums(
    token: Token | string,
    ids: string[]
): Promise<boolean[]> {
    return await (
        await sendRequest({
            endpoint: 'me/albums/contains',
            method: 'GET',
            token: token,
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param {Object} [options]
 * @returns {Promise<PagingObject<TrackObject>>} An array of saved {@link TrackObject track objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getUsersSavedTracks(
    token: Token | string,
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
        /** The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first object to return. Default: 0 (i.e., the first object). Use with `limit` to get the next set of objects. */
        offset?: number
    }
): Promise<PagingObject<TrackObject>> {
    return await (
        await sendRequest({
            endpoint: 'me/tracks',
            method: 'GET',
            token: token,
            queryParameter: options
        })
    ).json()
}

/**
 * Save one or more tracks to the current user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function saveTracksforUser(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/tracks',
            method: 'PUT',
            token: token,
            headers: { 'Content-Type': 'application/json' },
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Remove one or more tracks from the current user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function removeUsersSavedTracks(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/tracks',
            method: 'DELETE',
            token: token,
            headers: { 'Content-Type': 'application/json' },
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<boolean[]>} An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export async function checkUsersSavedTracks(
    token: Token | string,
    ids: string[]
): Promise<boolean[]> {
    return await (
        await sendRequest({
            endpoint: 'me/tracks/contains',
            method: 'GET',
            token: token,
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Get a list of the episodes saved in the current Spotify user’s library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param {Object} [options]
 * @returns {Promise<PagingObject<EpisodeObject>>} An array of saved {@link EpisodeObject episode objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getUsersSavedEpisodes(
    token: Token | string,
    options?: {
        /**
         * An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). If a country code is specified, only episodes that are available in that market will be returned.
         *
         * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the content is considered unavailable for the client.*
         *
         * Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).
         */
        market?: string
        /** The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first object to return. Default: 0 (i.e., the first object). Use with `limit` to get the next set of objects. */
        offset?: number
    }
): Promise<PagingObject<EpisodeObject>> {
    return await (
        await sendRequest({
            endpoint: 'me/episodes',
            method: 'GET',
            token: token,
            queryParameter: options
        })
    ).json()
}

/**
 * Save one or more episodes to the current user’s library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function saveEpisodesforUser(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/episodes',
            method: 'PUT',
            token: token,
            headers: { 'Content-Type': 'application/json' },
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Remove one or more episodes from the current user’s library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function removeUsersSavedEpisodes(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/episodes',
            method: 'DELETE',
            token: token,
            headers: { 'Content-Type': 'application/json' },
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Check if one or more episodes is already saved in the current Spotify user’s ‘Your Episodes’ library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>} An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export async function checkUsersSavedEpisodes(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/episodes/contains',
            method: 'GET',
            token: token,
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Get a list of shows saved in the current Spotify user’s library. Optional parameters can be used to limit the number of shows returned.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been isued on behalf of the user. The `user-libary-read` scope must have been authorised by the user.
 * @param {Object} [options]
 * @returns {Promise<PagingObject<ShowObject>>} An array of {@link ShowObject saved show objects} (wrapped in a {@link PagingObject paging object}) in JSON format. If the current user has no shows saved, the response will be an empty array. If a show is unavailable in the given `market` it is filtered out. The `total` field in the paging object represents the number of all items, filtered or not, and thus might be larger than the actual total number of observable items.
 */
export async function getUsersSavedShows(
    token: Token | string,
    options?: {
        /** The maximum number of shows to return. Default: 20. Minimum: 1. Maximum: 50 */
        limit?: number
        /** The index of the first show to return. Default: 0 (the first object). Use with limit to get the next set of shows. */
        offset?: number
    }
): Promise<PagingObject<ShowObject>> {
    return await (
        await sendRequest({
            endpoint: 'me/shows',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Save one or more shows to current Spotify user’s library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user. The `user-library-modify` scope must have been authorized by the user.
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {Promise<void>}
 */
export async function saveShowsforCurrentUser(
    token: Token | string,
    ids: string[]
): Promise<void> {
    return await (
        await sendRequest({
            endpoint: 'me/shows',
            method: 'PUT',
            token: token,
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Delete one or more shows from current Spotify user’s library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user. The `user-library-modify` scope must have been authorized by the user.
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @param {Object} options
 * @returns {Promise<void>}
 */
export async function removeUsersSavedShows(
    token: Token | string,
    ids: string[],
    options?: {
        /**
         * An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). If a country code is specified, only shows that are available in that market will be removed.
         *
         * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the content is considered unavailable for the client.*
         *
         * Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).
         */
        market: string
    }
): Promise<void> {
    const queryParameter: { [key: string]: any } = { ids: ids }
    if (options) queryParameter.market = options.market
    return await (
        await sendRequest({
            endpoint: 'me/shows',
            method: 'DELETE',
            token: token,
            queryParameter: queryParameter,
        })
    ).json()
}

/**
 * Check if one or more shows is already saved in the current Spotify user’s library.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been isued on behalf of the user. The `user-libary-read` scope must have been authorised by the user.
 * @param {string[]} ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {boolean[]} An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export async function checkUsersSavedShows(
    token: Token | string,
    ids: string[]
): Promise<boolean[]> {
    return await (
        await sendRequest({
            endpoint: 'me/shows/contains',
            method: 'GET',
            token: token,
            queryParameter: { ids: ids },
        })
    ).json()
}