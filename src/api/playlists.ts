export const endpoints = {
    ["Get a List of Current User's Playlists" as const]: {
        url: 'https://api.spotify.com/v1/me/playlists' as `https://api.spotify.com/v1/me/playlists`,
        method: 'GET' as const
    },
    ["Get a List of a User's Playlists" as const]: {
        url: 'https://api.spotify.com/v1/users/{user_id}/playlists' as `https://api.spotify.com/v1/users/${string}/playlists`,
        method: 'GET' as const
    },
    ['Create a Playlist' as const]: {
        url: 'https://api.spotify.com/v1/users/{user_id}/playlists' as `https://api.spotify.com/v1/users/${string}/playlists`,
        method: 'POST' as const
    },
    ['Get a Playlist' as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}' as `https://api.spotify.com/v1/playlists/${string}`,
        method: 'GET' as const
    },
    ["Change a Playlist's Details" as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}' as `https://api.spotify.com/v1/playlists/${string}`,
        method: 'PUT' as const
    },
    ["Get a Playlist's Items" as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks' as `https://api.spotify.com/v1/playlists/${string}/tracks`,
        method: 'GET' as const
    },
    ['Add Items to a Playlist' as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks' as `https://api.spotify.com/v1/playlists/${string}/tracks`,
        method: 'POST' as const
    },
    ["Reorder or Replace a Playlist's Items" as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks' as `https://api.spotify.com/v1/playlists/${string}/tracks`,
        method: 'PUT' as const
    },
    ['Remove Items from a Playlist' as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks' as `https://api.spotify.com/v1/playlists/${string}/tracks`,
        method: 'DELETE' as const
    },
    ['Get a Playlist Cover Image' as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}/images' as `https://api.spotify.com/v1/playlists/${string}/images`,
        method: 'GET' as const
    },
    ['Upload a Custom Playlist Cover Image' as const]: {
        url: 'https://api.spotify.com/v1/playlists/{playlist_id}/images' as `https://api.spotify.com/v1/playlists/${string}/images`,
        method: 'PUT' as const
    },
}

export type Name = keyof typeof endpoints
export type EndpointsInfo = typeof endpoints[keyof typeof endpoints]

export type RequestParams<R extends Name | EndpointsInfo> =
      R extends ("Get a List of Current User's Playlists" | typeof endpoints["Get a List of Current User's Playlists"]) ? GetListOfCurrentUserPlaylists
    : R extends ("Get a List of a User's Playlists" | typeof endpoints["Get a List of a User's Playlists"]) ? GetListOfUserPlaylists
    : R extends ('Create a Playlist' | typeof endpoints['Create a Playlist']) ? CreatePlaylist
    : R extends ('Get a Playlist' | typeof endpoints['Get a Playlist']) ? GetPlaylist
    : R extends ("Change a Playlist's Details" | typeof endpoints["Change a Playlist's Details"]) ? ChangePlaylistDetails
    : R extends ("Get a Playlist's Items" | typeof endpoints["Get a Playlist's Items"]) ? GetPlaylistItems
    : R extends ('Add Items to a Playlist' | typeof endpoints['Add Items to a Playlist']) ? AddItemsToPlaylist
    : R extends ("Reorder or Replace a Playlist's Items" | typeof endpoints["Reorder or Replace a Playlist's Items"]) ? ReorderOrReplacePlaylistItems
    : R extends ('Remove Items from a Playlist' | typeof endpoints['Remove Items from a Playlist']) ? RemoveItemsFromPlaylist
    : R extends ('Get a Playlist Cover Image' | typeof endpoints['Get a Playlist Cover Image']) ? GetPlaylistCoverImage
    : R extends ('Upload a Custom Playlist Cover Image' | typeof endpoints['Upload a Custom Playlist Cover Image']) ? UploadCustomPlaylistCoverImage
    : {}

/** Get a list of the playlists owned or followed by the current Spotify user. */
interface GetListOfCurrentUserPlaylists {
    queryParameter?: {
        /** The maximum number of playlists to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with `limit` to get the next set of playlists. */
        offset?: number
    }
}

/** Get a list of the playlists owned or followed by a Spotify user. */
interface GetListOfUserPlaylists extends GetListOfCurrentUserPlaylists {
    pathParameter: {
        /** The user’s [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). */
        '{user_id}': string
    }
}

/** Create a playlist for a Spotify user. (The playlist will be empty until you [add tracks](https://developer.spotify.com/documentation/web-api/reference/#endpoint-add-tracks-to-playlist).) */
interface CreatePlaylist {
    headers?: {
        /** The content type of the request body. */
        'Content-Type'?: 'application/json'
    }
    pathParameter: {
        /** The user’s [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). */
        '{user_id}': string
    }
    jsonBodyParameter: {
        /** The name for the new playlist, for example `"Your Coolest Playlist"` . This name does not need to be unique; a user may have several playlists with the same name. */
        name: string
        /** Defaults to `true` . If `true` the playlist will be public, if `false` it will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) */
        public?: boolean
        /** Defaults to `false` . If `true` the playlist will be collaborative. Note that to create a collaborative playlist you must also set `public` to `false` . To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes). */
        collaborative?: boolean
        /** Value for playlist description as displayed in Spotify Clients and in the Web PI. */
        description?: string
    }
}

/** Get a playlist owned by a Spotify user. */
interface GetPlaylist {
    pathParameter: {
        /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist. */
        '{playlist_id}': string
    }
    queryParameter?: {
        /**
         * An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). For episodes, if a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the episode is considered unavailable for the client.*
         */
        market?: string
        /**
         * Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned. For example, to get just the playlist’’s description and URI: `fields=description,uri`.
         *
         * A dot separator can be used to specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example, to get just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.
         *
         * Use multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.
         *
         * Fields can be excluded by prefixing them with an exclamation mark, for example: `fields=tracks.items(track(name,href,album(!name,href)))`
         */
        fields?: string
        /**
         * A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.
         *
         * **Note:** This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.
         */
        additional_types?: string
    }
}

/** Change a playlist’s name and public/private state. (The user must, of course, own the playlist.) */
interface ChangePlaylistDetails {
    headers: {
        /** The content type of the request body. */
        'Content-Type': 'application/json'
    }
    pathParameter: GetPlaylist['pathParameter']
    jsonBodyParameter: CreatePlaylist['jsonBodyParameter']
}

/** Get full details of the items of a playlist owned by a Spotify user. */
interface GetPlaylistItems {
    pathParameter: GetPlaylist['pathParameter']
    queryParameter: {
        /**
         * An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). For episodes, if a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the episode is considered unavailable for the client.*
         */
        market: string
    } & Omit<GetPlaylist['queryParameter'], 'market'> &
        GetListOfCurrentUserPlaylists['queryParameter']
}

/** Add one or more items to a user’s playlist. */
interface AddItemsToPlaylist {
    headers?: {
        /** *Required if URIs are passed in the request body, otherwise ignored.* The content type of the request body. */
        'Content-Type'?: 'application/json'
    }
    pathParameter: GetPlaylist['pathParameter']
    queryParameter?: {
        /** The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body. */
        position?: number
        /**
         * A comma-separated list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to add, can be track or episode URIs.
         *
         * For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`
         *
         * *A maximum of 100 items can be added in one request. Note: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below.*
         */
        uris?: string
    }
    jsonBodyParameter?: {
        /**
         * A JSON array of the [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to add.
         *
         * For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`
         *
         * *A maximum of 100 items can be added in one request. Note: if the uris parameter is present in the query string, any URIs listed here in the body will be ignored.*
         */
        uris?: string[]
        /**
         * The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array.
         *
         * For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`
         */
        position?: number
    }
}

/**
 * Either reorder or replace items in a playlist depending on the request’s parameters. To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request’s body. To replace items, include `uris` as either a query parameter or in the request’s body. Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
 *
 * **Note:** Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters. These operations can’t be applied together in a single request.
 */
interface ReorderOrReplacePlaylistItems {
    headers: AddItemsToPlaylist['headers']
    pathParameter: GetPlaylist['pathParameter']
    queryParameter: {
        /**
         * A comma-separated list of [Spotify URIs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) to add, can be track or episode URIs.
         *
         * For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`
         *
         * *A maximum of 100 items can be added in one request.*
         */
        uris?: string
    }
    jsonBodyParameter: {
        uris?: string[]
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
        snapshot_id?: number
    }
}

/** Remove one or more items from a user’s playlist. */
interface RemoveItemsFromPlaylist {
    pathParameter: GetPlaylist['pathParameter']
    jsonBodyParameter: {
        /** An array of objects containing [Spotify URIs](https://developer.spotify.com/spotify-documentation/web-api/#spotify-uris-and-ids) of the tracks or episodes to remove. For example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once. */
        tracks: string[]
        /** The playlist’s snapshot ID against which you want to make the changes. The API will validate that the specified items exist and in the specified positions and make the changes, even if more recent changes have been made to the playlist. */
        snapshot_id?: string
    }
}

/** Get the current image associated with a specific playlist. */
interface GetPlaylistCoverImage {
    pathParameter: GetPlaylist['pathParameter']
}

/**
 * Replace the image used to represent a specific playlist.
 *
 * **Note:** The request should contain a Base64 encoded JPEG image data, maximum payload size is 256 KB.
 */
interface UploadCustomPlaylistCoverImage {
    headers: {
        /** The content type of the request body */
        'Content-Type': 'image/jpeg'
    }
    pathParameter: GetPlaylist['pathParameter']
}

export type Response<R extends Name | EndpointsInfo> =
      R extends ("Get a List of Current User's Playlists" | typeof endpoints["Get a List of Current User's Playlists"]) ? GetListOfCurrentUserPlaylistsResponse
    : R extends ("Get a List of a User's Playlists" | typeof endpoints["Get a List of a User's Playlists"]) ? GetListOfUserPlaylistsResponse
    : R extends ('Create a Playlist' | typeof endpoints['Create a Playlist']) ? CreatePlaylistResponse
    : R extends ('Get a Playlist' | typeof endpoints['Get a Playlist']) ? GetPlaylistResponse
    : R extends ("Change a Playlist's Details" | typeof endpoints["Change a Playlist's Details"]) ? ChangePlaylistDetailsResponse
    : R extends ("Get a Playlist's Items" | typeof endpoints["Get a Playlist's Items"]) ? GetPlaylistItemsResponse
    : R extends ('Add Items to a Playlist' | typeof endpoints['Add Items to a Playlist']) ? AddItemsToPlaylistResponse
    : R extends ("Reorder or Replace a Playlist's Items" | typeof endpoints["Reorder or Replace a Playlist's Items"]) ? ReorderOrReplacePlaylistItemsResponse
    : R extends ('Remove Items from a Playlist' | typeof endpoints['Remove Items from a Playlist']) ? RemoveItemsFromPlaylistResponse
    : R extends ('Get a Playlist Cover Image' | typeof endpoints['Get a Playlist Cover Image']) ? GetPlaylistCoverImageResponse
    : R extends ('Upload a Custom Playlist Cover Image' | typeof endpoints['Upload a Custom Playlist Cover Image']) ? UploadCustomPlaylistCoverImageResponse
    : {}

/** An array of simplified PlaylistObjects (wrapped in a PagingObject) in JSON format. */
type GetListOfCurrentUserPlaylistsResponse = PagingObject<SimplifiedPlaylistObject>
/** An array of simplified PlaylistObjects (wrapped in a PagingObject) in JSON format. */
type GetListOfUserPlaylistsResponse = PagingObject<SimplifiedPlaylistObject>
/** Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.) */
type CreatePlaylistResponse = PagingObject<PlaylistObject> & {
    /** giving the Web API endpoint for the new playlist. */
    Location: string
}
/** The created PlaylistObject in JSON format. */
type GetPlaylistResponse = PlaylistObject
/**  */
type ChangePlaylistDetailsResponse = undefined
/** An array of TrackObjects and EpisodeObjects (depends on the additional_types parameter), wrapped in a PagingObject in JSON format. */
type GetPlaylistItemsResponse = PagingObject<PlaylistTrackObject>
/** The response body contains a `snapshot_id` in JSON format. The `snapshot_id` can be used to identify your playlist version in future requests. */
type AddItemsToPlaylistResponse = object
/** On a successful reorder operation, the response body contains a `snapshot_id` in JSON format. */
type ReorderOrReplacePlaylistItemsResponse = object
/** The response body contains a `snapshot_id` in JSON format. */
type RemoveItemsFromPlaylistResponse = object
/** The response body contains a list of ImageObjects in JSON format. */
type GetPlaylistCoverImageResponse = ImageObject[]
/**  */
type UploadCustomPlaylistCoverImageResponse = undefined
