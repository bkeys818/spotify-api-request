import sendRequest from '../send-requests'
import type { Token, Responses } from 'spotify-objects'

/**
 * Add the current user as a follower of a playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br/>Following a playlist publicly requires authorization of the `playlist-modify-public` scope; following a playlist privately requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).<br/>*Note that the scopes you provide relate only to whether the current user is following the playlist publicly or privately (i.e. showing others what they are following), not whether the playlist itself is public or private.*
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) of the playlist. Any playlist can be followed, regardless of its [public/private status](https://developer.spotify.com/documentation/general/guides/working-with-playlists/#public-private-and-collaborative-status), as long as you know its playlist ID.
 * @param [options]
 * @returns
 */
export const followPlaylist = (
    token: Token | string,
    playlistId: string,
    options?: {
        /** Defaults to `true`. If `true` the playlist will be included in user’s public playlists, if `false` it will remain private. */
        public: boolean
    }
): Promise<Responses.followPlaylist> =>
    sendRequest({
        endpoint: `playlists/${playlistId}/followers`,
        method: 'PUT',
        token: token,
        bodyParameter: options,
    })

/**
 * Remove the current user as a follower of a playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>Unfollowing a publicly followed playlist for a user requires authorization of the `playlist-modify-public` scope; unfollowing a privately followed playlist requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).<br>*Note that the scopes you provide relate only to whether the current user is following the playlist publicly or privately (i.e. showing others what they are following), not whether the playlist itself is public or private.*
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) of the playlist that is to be no longer followed.
 * @returns
 */
export const unfollowPlaylist = (
    token: Token | string,
    playlistId: string
): Promise<Responses.unfollowPlaylist> =>
    sendRequest({
        endpoint: `playlists/${playlistId}/followers`,
        method: 'DELETE',
        token: token,
    })

/**
 * Check to see if one or more Spotify users are following a specified playlist.
 * @param token - A valid user access token or your client credentials. Requires the `playlist-read-private` scope if a private playlist is requested.
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) of the playlist.
 * @param userIds - A list of [Spotify User IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids); the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.
 * @returns An array of `true` or `false` values, in the same order in which the `ids` were specified.
 */
export const checkIfUsersFollowPlaylist = (
    token: Token | string,
    playlistId: string,
    userIds: string[]
): Promise<Responses.checkIfUsersFollowPlaylist> =>
    sendRequest({
        endpoint: `playlists/${playlistId}/followers/contains`,
        token: token,
        queryParameter: { ids: userIds },
    })

/**
 * Get the current user’s followed artists.
 * @param token - A valid user access token or your client credentials. Requires the `user-follow-modify` scope.
 * @param options
 * @returns An object that conatins an `artists` object. The `artists` object in turn contains a {@link CursorPagingObject<ArtistObject> cursor-based paging object} of {@link ArtistObject Artists}.
 */
export const getUserFollowedArtists = <T extends 'artist'>(
    token: Token | string,
    options: {
        /** The ID type: currently only `artist` is supported. */
        type: T
        /** The last artist ID retrieved from the previous request. */
        after?: string
        /** The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
    }
): Promise<Responses.getUserFollowedArtists> =>
    sendRequest({
        endpoint: 'me/following',
        token: token,
        queryParameter: options,
    })

/**
 * Add the current user as a follower of one or more artists or other Spotify users.
 * @param token - A valid user access token or your client credentials. Requires the `user-follow-modify` scope.
 * @param type - The ID type.
 * @param ids - A list of the artist or the user [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). A maximum of 50 IDs can be sent in one request.
 * @returns
 */
export const followArtistsOrUsers = (
    token: Token | string,
    type: 'artist' | 'user',
    ids: string[]
): Promise<Responses.followArtistsOrUsers> =>
    sendRequest({
        endpoint: 'me/following',
        method: 'PUT',
        token: token,
        queryParameter: { type: type },
        bodyParameter: { ids: ids },
    })

/**
 * Remove the current user as a follower of one or more artists or other Spotify users.
 * @param token - A valid user access token or your client credentials. Requires the `user-follow-modify` scope.
 * @param type - The ID type.
 * @param ids - A list of the artist or the user [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). A maximum of 50 IDs can be sent in one request.
 * @returns
 */
export const unfollowArtistsOrUsers = (
    token: Token | string,
    type: 'artist' | 'user',
    ids: string[]
): Promise<Responses.unfollowArtistsOrUsers> =>
    sendRequest({
        endpoint: 'me/following',
        method: 'DELETE',
        token: token,
        queryParameter: { type: type },
        bodyParameter: { ids: ids },
    })

/**
 * Check to see if the current user is following one or more artists or other Spotify users.
 * @param token - A valid user access token or your client credentials. Requires the `user-follow-read` scope.
 * @param type - The ID type.
 * @param ids - A list of the artist or the user [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). A maximum of 50 IDs can be sent in one request.
 * @returns An array of `true` or `false` values, in the same order in which the `ids` were specified.
 */
export const getFollowingStateForArtistsOrUsers = (
    token: Token | string,
    type: 'artist' | 'user',
    ids: string[]
): Promise<Responses.getFollowingStateForArtistsOrUsers> =>
    sendRequest({
        endpoint: 'me/following/contains',
        token: token,
        queryParameter: { type: type, ids: ids },
    })
