import sendRequest from '../send-requests'
import type { Token, Responses } from 'spotify-objects'

/**
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 * @param token - A valid user access token or your client credentials.
 * @param ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artists. Maximum: 50 IDs.
 * @returns An object whose key is `"artists"` and whose value is an array of {@link ArtistObject artist object}.
 */
export const getMultipleArtists = (
    token: Token | string,
    ids: string[]
): Promise<Responses.getMultipleArtists> =>
    sendRequest({
        endpoint: 'artists',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 * @param token - A valid user access token or your client credentials.
 * @param id - The Spotify ID of the artist.
 * @returns An artist object.
 */
export const getArtist = (
    token: Token | string,
    id: string
): Promise<Responses.getArtist> =>
    sendRequest({ endpoint: `artists/${id}`, token: token })

/**
 * Get Spotify catalog information about an artist’s top tracks by country.
 * @param token - A valid user access token or your client credentials.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
 * @param [options]
 * @returns An object whose key is `"tracks"` and whose value is an array of up to 10 {@link TrackObject track objects}.<br>Note: The {@link TrackObject Track objects} in the response don't conain `available_markets` and nor does it's `album` property.
 */
export const getArtistTopTracks = (
    token: Token | string,
    id: string,
    options: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Synonym for `country`. */
        market: string
    }
): Promise<Responses.getArtistTopTracks> =>
    sendRequest({
        endpoint: `artists/${id}/top-tracks`,
        token: token,
        queryParameter: options,
    })

/**
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community’s [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 * @param token - A valid user access token or your client credentials.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
 * @returns An object whose key is `"artists"` and whose value is an array of up to 20 {@link ArtistObject artist objects}.
 */
export const getArtistRelatedArtists = (
    token: Token | string,
    id: string
): Promise<Responses.getArtistRelatedArtists> =>
    sendRequest({ endpoint: `artists/${id}/related-artists`, token: token })

type AlbumType = 'album' | 'single' | 'appears_on' | 'compilation'
/**
 * Get Spotify catalog information about an artist’s albums.
 * @param token - A valid user access token or your client credentials.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
 * @param [options]
 * @returns An array of {@link SimplifiedAlbumObject simplified album objects} (wrapped in a {@link PagingObject paging object}).
 */
export const getArtistAlbums = (
    token: Token | string,
    id: string,
    options?: {
        /**
         * A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. Valid values are:
         * - `album`
         * - `single`
         * - `appears_on`
         * - `compilation`
         *
         * For example: `include_groups=album,single.`
         */
        include_groups?: AlbumType | AlbumType[]
        /**
         * Synonym for `country`. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`.
         *
         * Supply this parameter to limit the response to one particular geographical market. For example, for albums available in Sweden: `market=SE`.
         *
         * *If not given, results will be returned for all markets and you are likely to get duplicate results per album, one for each market in which the album is available!*
         */
        market?: string
        /** The number of album objects to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first album to return. Default: 0 (i.e., the first album). Use with `limit` to get the next set of albums. */
        offset?: number
    }
): Promise<Responses.getArtistAlbums> =>
    sendRequest({
        endpoint: `artists/${id}/albums`,
        token: token,
        queryParameter: options,
    })
