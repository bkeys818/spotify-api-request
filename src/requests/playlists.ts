import { sendRequest } from '../global'
import type { Token, Responses } from 'spotify-objects'

/**
 * Get a list of the playlists owned or followed by the current Spotify user.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Private playlists are only retrievable for the current user and requires the `playlist-read-private` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) to have been authorized by the user. Note that this scope alone will not return collaborative playlists, even though they are always private.<br>Collaborative playlists are only retrievable for the current user and requires the `playlist-read-collaborative` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) to have been authorized by the user.
 * @param [options]
 * @param [options.limit=20]
 * @param [options.offset=0]
 * @returns An array of {@link SimplifiedPlaylistObject simplified playlist object} (wrapped in a {@link PagingObject paging object}).
 */
export async function getListOfCurrentUserPlaylists(
    token: Token | string,
    options?: {
        /** The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100,000. Use with `limit` to get the next set of playlists. */
        offset?: number
    }
): Promise<Responses.getListOfCurrentUserPlaylists> {
    return await (
        await sendRequest({
            endpoint: 'me/playlists',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Get a list of the playlists owned or followed by a Spotify user.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>Private playlists are only retrievable for the current user and requires the `playlist-read-private` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) to have been authorized by the user. Note that this scope alone will not return collaborative playlists, even though they are always private.<br>Collaborative playlists are only retrievable for the current user and requires the `playlist-read-collaborative` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) to have been authorized by the user.
 * @param userId - The user’s [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
 * @param [options]
 * @param [options.limit=20]
 * @param [options.offset=0]
 * @returns An array of {@link SimplifiedPlaylistObject simplified playlist object} (wrapped in a {@link PagingObject paging object}).
 */
export async function getListOfUserPlaylists(
    token: Token | string,
    userId: string,
    options?: {
        /** The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with `limit` to get the next set of playlists. */
        offset?: number
    }
): Promise<Responses.getListOfUserPlaylists> {
    return await (
        await sendRequest({
            endpoint: 'users/{user_id}/playlists',
            method: 'GET',
            token: token,
            pathParameter: { user_id: userId },
            queryParameter: options,
        })
    ).json()
}

/**
 * Create a playlist for a Spotify user. (The playlist will be empty until you {@link addItemsToPlaylist add tracks}.)
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user. Creating a public playlist for a user requires authorization of the `playlist-modify-public` scope; creating a private playlist requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param userId - The user’s [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
 * @param [options]
 * @param options.name
 * @param [options.public=true]
 * @param [options.collaborative=false]
 * @param [options.description]
 * @returns - The created {@link addItemsToPlaylist playlist object}.
 */
export async function createPlaylist(
    token: Token | string,
    userId: string,
    options: {
        /** The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name. */
        name: string
        /** Defaults to `true` . If `true` the playlist will be public, if `false` it will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes). */
        public?: boolean
        /** Defaults to `false`. If `true` the playlist will be collaborative. Note that to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes). */
        collaborative?: boolean
        /** Value for playlist description as displayed in Spotify Clients and in the Web API. */
        description?: string
    }
): Promise<Responses.createPlaylist> {
    return await (
        await sendRequest({
            endpoint: 'users/{user_id}/playlists',
            method: 'POST',
            token: token,
            headers: {
                'Content-Type': 'application/json',
            },
            pathParameter: {
                user_id: userId,
            },
            bodyParameter: options,
        })
    ).json()
}

/**
 * Get a playlist owned by a Spotify user.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. Both Public and Private playlists belonging to any user are retrievable on provision of a valid access token.
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param [options]
 * @param [options.market]
 * @param [options.fields]
 * @param [options.additional_types]
 * @returns A {@link PlaylistObject playlist object} in JSON.
 */
export async function getPlaylist(
    token: Token | string,
    playlistId: string,
    options?: {
        /**
         * An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). For episodes, if a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the episode is considered unavailable for the client.*
         */
        market?: string
        /** Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned. For example, to get just the playlist’’s description and URI: `fields=description,uri`. A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example, to get just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`. Use multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`. Fields can be excluded by prefixing them with an exclamation mark, for example: `fields=tracks.items(track(name,href,album(!name,href)))`. */
        fields?: string
        /** A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`. **Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object. */
        additional_types?: string
    }
): Promise<Responses.getPlaylist> {
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}',
            method: 'GET',
            token: token,
            pathParameter: {
                playlist_id: playlistId,
            },
            queryParameter: options,
        })
    ).json()
}

/**
 * Change a playlist’s name and public/private state. (The user must, of course, own the playlist.)
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>Changing a public playlist for a user requires authorization of the `playlist-modify-public` scope; changing a private playlist requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param options
 * @param options.name
 * @param [options.public]
 * @param [options.collaborative]
 * @param [options.description]
 * @return {Promise<Responses.>}
 */
export async function changePlaylistDetails(
    token: Token | string,
    playlistId: string,
    options: {
        /** The new name for the playlist, for example `"My New Playlist Title"`. */
        name: string
        /** If `true` the playlist will be public, if `false` it will be private. */
        public: boolean
        /** If `true` , the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. Note: You can only set `collaborative` to `true` on non-public playlists. */
        collaborative: boolean
        /** Value for playlist description as displayed in Spotify Clients and in the Web API. */
        description: string
    }
): Promise<Responses.changePlaylistDetails> {
    await sendRequest({
        endpoint: 'playlists/{playlist_id}',
        method: 'PUT',
        token: token,
        headers: {
            'Content-Type': 'application/json',
        },
        pathParameter: {
            playlist_id: playlistId,
        },
        bodyParameter: options,
    })
}

/**
 * Get full details of the items of a playlist owned by a Spotify user.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. Both Public and Private playlists belonging to any user are retrievable on provision of a valid access token.
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param options
 * @param options.market
 * @param [options.fields]
 * @param [options.limit]
 * @param [options.offset]
 * @param [options.additional_types]
 * @returns An array of {@link PlaylistTrackObject playlist’s track objects} and {@link EpisodeObject episode objects} (depends on the `additional_types` parameter), wrapped in a {@link PagingObject paging object}.
 */
export async function getPlaylistItems(
    token: Token | string,
    playlistId: string,
    options: {
        /**
         * An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). For episodes, if a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the episode is considered unavailable for the client*
         */
        market: string
        /** Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned. For example, to get just the playlist’’s description and URI: `fields=description,uri`. A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example, to get just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`. Use multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`. Fields can be excluded by prefixing them with an exclamation mark, for example: `fields=tracks.items(track(name,href,album(!name,href)))`. */
        fields?: string
        /** The maximum number of items to return. Default: 100. Minimum: 1. Maximum: 100. */
        limit?: number
        /** The index of the first item to return. Default: 0 (the first object). */
        offset?: number
        /** A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`. **Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object. */
        additional_types?: 'track' | 'episode'
    }
): Promise<Responses.getPlaylistItems> {
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}/tracks',
            method: 'GET',
            token: token,
            pathParameter: {
                playlist_id: playlistId,
            },
            queryParameter: options,
        })
    ).json()
}

/**
 * Add one or more items to a user’s playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>Adding items to the current user’s public playlists requires authorization of the `playlist-modify-public` scope; adding items to the current user’s private playlist (including collaborative playlists) requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param options
 * @param [options.position]
 * @param [options.uris]
 * @returns A `snapshot_id` in JSON format. The `snapshot_id` can be used to identify your playlist version in future requests.
 */
export async function addItemsToPlaylist(
    token: Token | string,
    playlistId: string,
    options?: {
        /** The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body. */
        position?: number
        /**
         * A comma-separated list of Spotify URIs to add, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`.
         *
         * *A maximum of 100 items can be added in one request. Note: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below.*
         */
        uris?: string
    }
): Promise<Responses.addItemsToPlaylist> {
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}/tracks',
            method: 'POST',
            token: token,
            pathParameter: {
                playlist_id: playlistId,
            },
            bodyParameter: options,
        })
    ).json()
}

/**
 * Reorder items in a playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>Reordering or replacing items in the current user’s public playlists requires authorization of the `playlist-modify-public` scope; reordering or replacing items in the current user’s private playlist (including collaborative playlists) requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param options
 * @returns A `snapshot_id` in JSON format. The `snapshot_id` can be used to identify your playlist version in future requests.
 */
export async function reorderPlaylistItems(
    token: Token | string,
    playlistId: string,
    options: {
        /** The position of the first item to be reordered. */
        range_start?: number
        /**
         * The position where the items should be inserted.
         *
         * To reorder the items to the end of the playlist, simply set `insert_before` to the position after the last item.
         *
         * Examples:
         *
         * To reorder the first item to the last position in a playlist with 10 items, set `range_start` to 0, and `insert_before` to 10.
         *
         * To reorder the last item in a playlist with 10 items to the start of the playlist, set `range_start` to 9, and `insert_before` to 0.
         */
        insert_before?: number
        /**
         * The amount of items to be reordered. Defaults to 1 if not set.
         *
         * The range of items to be reordered begins from the `range_start` position, and includes the `range_length` subsequent items.
         *
         * Example:
         *
         * To move the items at index 9-10 to the start of the playlist, `range_start` is set to 9, and `range_length` is set to 2.
         */
        range_length?: number
        /** The playlist’s snapshot ID against which you want to make the changes. */
        snapshot_id?: string
    }
): Promise<Responses.reorderOrReplacePlaylistItems> {
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}/tracks',
            method: 'PUT',
            token: token,
            headers: {
                'Content-Type': 'application/json',
            },
            pathParameter: {
                playlist_id: playlistId,
            },
            bodyParameter: options,
        })
    ).json()
}

/**
 * Replace items in a playlist. Replacing items will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>Reordering or replacing items in the current user’s public playlists requires authorization of the `playlist-modify-public` scope; reordering or replacing items in the current user’s private playlist (including collaborative playlists) requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param uris - A list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to set, can be track or episode URIs. A maximum of 100 items can be set in one request.
 * @returns A `snapshot_id` in JSON format. The `snapshot_id` can be used to identify your playlist version in future requests.
 */
export async function replacePlaylistItems(
    token: Token | string,
    playlistId: string,
    uris: string[]
): Promise<Responses.reorderOrReplacePlaylistItems> {
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}/tracks',
            method: 'PUT',
            token: token,
            headers: {
                'Content-Type': 'application/json',
            },
            pathParameter: {
                playlist_id: playlistId,
            },
            queryParameter: {
                uris: uris
            }
        })
    ).json()
}

/**
 * Remove one or more items from a user’s playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user. Removing items from a user’s public playlist requires authorization of the `playlist-modify-public` scope; removing items from a private playlist requires the `playlist-modify-private` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param tracks - An array of objects containing [Spotify URIs](https://developer.spotify.com/spotify-documentation/web-api/#spotify-uris-and-ids) of the tracks or episodes to remove. For example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.
 * @param [snapshotId] - The playlist’s snapshot ID against which you want to make the changes. The API will validate that the specified items exist and in the specified positions and make the changes, even if more recent changes have been made to the playlist.
 * @returns A `snapshot_id` in JSON format. The `snapshot_id` can be used to identify your playlist version in future requests.
 */
export async function removeItemsFromPlaylist(
    token: Token | string,
    playlistId: string,
    tracks: {
        uri: string
        positions?: number[]
    }[],
    snapshotId?: string
): Promise<Responses.removeItemsFromPlaylist> {
    const jsonBody: { [key: string]: any } = {
        tracks: tracks,
    }
    if (snapshotId) jsonBody.snapshot_id = snapshotId
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}/tracks',
            method: 'DELETE',
            token: token,
            headers: {
                'Content-Type': 'application/json',
            },
            pathParameter: {
                playlist_id: playlistId,
            },
            bodyParameter: jsonBody,
        })
    ).json()
}

/**
 * Get the current image associated with a specific playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>This access token must be issued on behalf of the user.<br>Current playlist image for both Public and Private playlists of any user are retrievable on provision of a valid access token.
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @returns A list of image objects.
 */
export async function getPlaylistCoverImage(
    token: Token | string,
    playlistId: string
): Promise<Responses.getPlaylistCoverImage> {
    return await (
        await sendRequest({
            endpoint: 'playlists/{playlist_id}/images',
            method: 'GET',
            token: token,
            pathParameter: {
                playlist_id: playlistId,
            },
        })
    ).json()
}

/**
 * Replace the image used to represent a specific playlist.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the user.<br>This access token must be tied to the user who owns the playlist, and must have the scope `ugc-image-upload` granted. In addition, the token must also contain `playlist-modify-public` and/or `playlist-modify-private`, depending the public status of the playlist you want to update . See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param playlistId - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
 * @param image - The Buffer of a JPEG image or a Base64 encoded JPEG image, maximum size is 256 KB.
 * @returns
 */
export async function uploadCustomPlaylistCoverImage(
    token: Token | string,
    playlistId: string,
    image: Buffer | string
): Promise<Responses.uploadCustomPlaylistCoverImage> {
    if (typeof image != 'string') image = Buffer.from(image).toString('base64')
    // TODO: - Error if data to large
    // Throw error if data size > 256_000 bytes

    await sendRequest({
        endpoint: 'playlists/{playlist_id}/images',
        method: 'PUT',
        token: token,
        headers: { 'Content-Type': 'image/jpeg' },
        pathParameter: { playlist_id: playlistId },
        bodyParameter: image,
    })
}

/**
 * Get size of a Base64 encoded image.
 * @internal
 * @returns {number} Size of data in bytes.
 */
// function sizeOfBase64(data: string): number {
//     const n = data.length
//     if (data.charAt(data.length - 1) == '=') {
//         const y = data.charAt(data.length - 2) == '=' ? 2 : 1
//         return n * (3 / 4) - y
//     }
//     throw new TypeError("Data isn't base64 encoded image.")
// }
