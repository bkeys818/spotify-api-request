import sendRequest from '../send-requests'
import type { Token, Objects } from 'spotify-objects'

/**
 * Get Spotify Catalog information about albums, artists, playlists, tracks, shows or episodes that match a keyword string.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param options
 * @returns For each `type` provided in the type parameter, the response contains an array of {@link ArtistObject artist objects} / {@link SimplifiedAlbumObject simplified album objects} / {@link TrackObject track objects} / {@link SimplifiedShowObject simplified show objects} / {@link SimplifiedEpisodeObject simplified episode objects} wrapped in a {@link PagingObject paging object}
 */
export const searchForItem = <T extends SearchType | SearchType[]>(
    token: Token | string,
    options: {
        /** Search [query](https://developer.spotify.com/documentation/web-api/reference/#notes-2) keywords and optional field filters and operators. */
        q: string
        /** A list of item types to search across. Search results include hits from all the specified item types. */
        type: T
        /**
         * An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `"from_token"`.
         *
         * If a country code is specified, only content that is playable in that market is returned.
         *
         * **Note**:
         *
         * - Playlist results are not affected by the market parameter.
         *
         * - If market is set to `from_token`, and a valid access token is specified in the request header, only content playable in the country associated with the user account, is returned.
         *
         * - Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/). A user must grant access to the `user-read-private` scope prior to when the access token is issued.
         */
        market?: string
        /**
         * Maximum number of results to return.
         *
         * Default: 20
         *
         * Minimum: 1
         *
         * Maximum: 50
         *
         * **Note**: The limit is applied within each type, not on the total response.
         *
         * For example, if the limit value is 3 and the type is `['artist', 'album']`, the response contains 3 artists and 3 albums.
         */
        limit?: number
        /**
         * The index of the first result to return.
         *
         * Default: 0 (the first result).
         *
         * Maximum offset (including limit): 1,000.
         *
         * Use with limit to get the next page of search results.
         */
        offset?: number
        /**
         * If *audio* is specified the response will include any relevant audio content that is hosted externally.
         *
         * By default external content is filtered out from responses.
         */
        include_external?: 'audio'
    }
): Promise<SearchResponse<T>> => {
    if (Array.isArray(options.type))
        options.type.map((type) => type.slice(0, -1))
    else (options.type as string) = options.type.slice(0, -1)
    return sendRequest({
        endpoint: 'search',
        token: token,
        queryParameter: options,
    })
}

type SearchType = keyof SearchResponseObject
interface SearchResponseObject {
    albums: Objects.Paging<Objects.SimplifiedAlbum>
    artists: Objects.Paging<Objects.Artist>
    playlists: Objects.Paging<Objects.SimplifiedPlaylist>
    tracks: Objects.Paging<Objects.Track>
    shows: Objects.Paging<Objects.SimplifiedShow>
    episodes: Objects.Paging<Objects.SimplifiedEpisode>
}
type SearchResponse<T extends SearchType | SearchType[]> = T extends SearchType
    ? Pick<SearchResponseObject, T>
    : T extends SearchType[]
    ? Pick<SearchResponseObject, T[number]>
    : never
