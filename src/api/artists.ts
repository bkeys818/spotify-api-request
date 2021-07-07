import { sendRequest } from '../request'
import type { Token } from '../authorize'
import type {
    ArtistObject,
    TrackObject,
    SimplifiedAlbumObject,
    PagingObject,
} from './objects'

/**
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string[]} ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artists. Maximum: 50 IDs.
 * @returns {Promise<{ artists: (ArtistObject | null)[] }>} An object whose key is `"artists"` and whose value is an array of {@link ArtistObject artist object}.
 */
export async function getMultipleArtists(
    token: Token | string,
    ids: string[]
): Promise<{
    artists: (ArtistObject | null)[]
}> {
    return await (
        await sendRequest({
            endpoint: 'artists',
            method: 'GET',
            token: token,
            queryParameter: {
                ids: ids.join(','),
            },
        })
    ).json()
}

/**
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string} id - The Spotify ID of the artist.
 * @returns {Promise<ArtistObject>} An artist object.
 */
export async function getArtist(
    token: Token | string,
    id: string
): Promise<ArtistObject> {
    return await (
        await sendRequest({
            endpoint: 'artists/{id}',
            method: 'GET',
            token: token,
            pathParameter: {
                id: id,
            },
        })
    ).json()
}

/**
 * Get Spotify catalog information about an artist’s top tracks by country.
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
 * @param {Object} [options]
 * @returns {Promise<{ tracks: TrackObject[] }>} An object whose key is `"tracks"` and whose value is an array of up to 10 {@link TrackObject track objects}.
 */
export async function getArtistTopTracks(
    token: Token | string,
    id: string,
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Synonym for `country`. */
        market: string
    }
): Promise<{ tracks: TrackObject[] }> {
    return await (
        await sendRequest({
            endpoint: 'artists/{id}/top-tracks',
            method: 'GET',
            token: token,
            pathParameter: {
                id: id,
            },
            queryParameter: options,
        })
    ).json()
}

/**
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community’s [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
 * @returns {Promise<{ artists: ArtistObject[] }>} An object whose key is `"artists"` and whose value is an array of up to 20 {@link ArtistObject artist objects}.
 */
export async function getArtistRelatedArtists(
    token: Token | string,
    id: string
): Promise<{ artists: ArtistObject[] }> {
    return await (
        await sendRequest({
            endpoint: 'artists/{id}/related-artists',
            method: 'GET',
            token: token,
            pathParameter: {
                id: id,
            },
        })
    ).json()
}

/**
 * Get Spotify catalog information about an artist’s albums.
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist.
 * @param {Object} [options]
 * @returns {Promise<PagingObject<SimplifiedAlbumObject, 'artist’s albums'>>} an array of simplified {@link SimplifiedAlbumObject album objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getArtistAlbums(
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
        include_groups?: string
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
): Promise<PagingObject<SimplifiedAlbumObject, 'artist’s albums'>> {
    return await (
        await sendRequest({
            endpoint: 'artists/{id}/albums',
            method: 'GET',
            token: token,
            pathParameter: {
                id: id,
            },
            queryParameter: options,
        })
    ).json()
}
