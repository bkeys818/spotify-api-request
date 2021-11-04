import sendRequest from '../send-requests'
import type { Token, Responses } from 'spotify-objects'

/**
 * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param [options]
 * @returns An array of {@link SavedAlbumObject saved album objects} (wrapped in a {@link PagingObject paging object}).
 */
export const getCurrentUserSavedAlbums = (
    token: Token | string,
    options?: {
        /** The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first object to return. Default: 0 (i.e., the first object). Use with `limit` to get the next set of objects. */
        offset?: number
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
    }
): Promise<Responses.getCurrentUserSavedAlbums> =>
    sendRequest({
        endpoint: 'me/albums',
        token: token,
        queryParameter: options,
    })

/**
 * Save one or more albums to the current user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const saveAlbumsForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.saveAlbumsForCurrentUser> =>
    sendRequest({
        endpoint: 'me/albums',
        method: 'PUT',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Remove one or more albums from the current user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const removeAlbumsForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.removeAlbumsForCurrentUser> =>
    sendRequest({
        endpoint: 'me/albums',
        method: 'DELETE',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the albums. Maximum: 50 IDs.
 * @returns An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export const checkCurrentUserSavedAlbums = (
    token: Token | string,
    ids: string[]
): Promise<Responses.checkCurrentUserSavedAlbums> =>
    sendRequest({
        endpoint: 'me/albums/contains',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param [options]
 * @returns An array of {@link SavedTrackObject saved track objects} (wrapped in a {@link PagingObject paging object}).
 */
export const getCurrentUserSavedTracks = (
    token: Token | string,
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
        /** The maximum number of objects to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first object to return. Default: 0 (i.e., the first object). Use with `limit` to get the next set of objects. */
        offset?: number
    }
): Promise<Responses.getCurrentUserSavedTracks> =>
    sendRequest({
        endpoint: 'me/tracks',
        token: token,
        queryParameter: options,
    })

/**
 * Save one or more tracks to the current user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const saveTracksForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.saveTracksForCurrentUser> =>
    sendRequest({
        endpoint: 'me/tracks',
        method: 'PUT',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Remove one or more tracks from the current user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const removeTracksForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.removeTracksForCurrentUser> =>
    sendRequest({
        endpoint: 'me/tracks',
        method: 'DELETE',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export const checkCurrentUserSavedTracks = (
    token: Token | string,
    ids: string[]
): Promise<Responses.checkCurrentUserSavedTracks> =>
    sendRequest({
        endpoint: 'me/tracks/contains',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Get a list of the episodes saved in the current Spotify user’s library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param [options]
 * @returns An array of {@link SavedEpisodeObject saved episode objects} (wrapped in a {@link PagingObject paging object}).
 */
export const getCurrentUserSavedEpisodes = (
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
): Promise<Responses.getCurrentUserSavedEpisodes> =>
    sendRequest({
        endpoint: 'me/episodes',
        token: token,
        queryParameter: options,
    })

/**
 * Save one or more episodes to the current user’s library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s “Your Music” collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const saveEpisodesForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.saveEpisodesForCurrentUser> =>
    sendRequest({
        endpoint: 'me/episodes',
        method: 'PUT',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Remove one or more episodes from the current user’s library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Modification of the current user’s collection requires authorization of the `user-library-modify` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const removeEpisodesForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.removeEpisodesForCurrentUser> =>
    sendRequest({
        endpoint: 'me/episodes',
        method: 'DELETE',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Check if one or more episodes is already saved in the current Spotify user’s ‘Your Episodes’ library.
 *
 * This API endpoint is in **beta** and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The `user-library-read` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) must have been authorized by the user.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export const checkCurrentUserSavedEpisodes = (
    token: Token | string,
    ids: string[]
): Promise<Responses.checkCurrentUserSavedEpisodes> =>
    sendRequest({
        endpoint: 'me/episodes/contains',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Get a list of shows saved in the current Spotify user’s library. Optional parameters can be used to limit the number of shows returned.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been isued on behalf of the user. The `user-libary-read` scope must have been authorised by the user.
 * @param [options]
 * @returns An array of {@link SavedShowObject saved show objects} (wrapped in a {@link PagingObject paging object}) in JSON format. If the current user has no shows saved, the response will be an empty array. If a show is unavailable in the given `market` it is filtered out. The `total` field in the paging object represents the number of all items, filtered or not, and thus might be larger than the actual total number of observable items.
 */
export const getCurrentUserSavedShows = (
    token: Token | string,
    options?: {
        /** The maximum number of shows to return. Default: 20. Minimum: 1. Maximum: 50 */
        limit?: number
        /** The index of the first show to return. Default: 0 (the first object). Use with limit to get the next set of shows. */
        offset?: number
    }
): Promise<Responses.getCurrentUserSavedShows> =>
    sendRequest({
        endpoint: 'me/shows',
        token: token,
        queryParameter: options,
    })

/**
 * Save one or more shows to current Spotify user’s library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user. The `user-library-modify` scope must have been authorized by the user.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns
 */
export const saveShowsForCurrentUser = (
    token: Token | string,
    ids: string[]
): Promise<Responses.saveShowsForCurrentUser> =>
    sendRequest({
        endpoint: 'me/shows',
        method: 'PUT',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Delete one or more shows from current Spotify user’s library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user. The `user-library-modify` scope must have been authorized by the user.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @param options
 * @returns
 */
export const removeShowsForCurrentUser = (
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
): Promise<Responses.removeShowsForCurrentUser> =>
    sendRequest({
        endpoint: 'me/shows',
        method: 'DELETE',
        token: token,
        queryParameter: { ids: ids, ...options },
    })

/**
 * Check if one or more shows is already saved in the current Spotify user’s library.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been isued on behalf of the user. The `user-libary-read` scope must have been authorised by the user.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). Maximum: 50 IDs.
 * @returns {boolean[]} An array of `true` or `false` values, in the same order in which the ids were specified.
 */
export const checkCurrentUserSavedShows = (
    token: Token | string,
    ids: string[]
): Promise<Responses.checkCurrentUserSavedShows> =>
    sendRequest({
        endpoint: 'me/shows/contains',
        token: token,
        queryParameter: { ids: ids },
    })
