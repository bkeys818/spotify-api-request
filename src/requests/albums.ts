import { sendRequest } from '../global'
import type { Token } from '../auth'
import type { AlbumObject, PagingObject, SimplifiedTrackObject } from '../objects'

/**
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 * @param token - A valid user access token or your client credentials.
 * @param ids - A comma-separated list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for albums. Maximum: 20 IDs.
 * @param [options]
 * @returns Objects are returned in the order requested. If an object is not found, a `null` value is returned in the appropriate position. Duplicate `ids` in the query will result in duplicate objects in the response.
 */
export async function getMultipleAlbums(
    token: Token | string,
    ids: string[],
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) orstring `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market: string
    }
): Promise<{ albums: (AlbumObject | null)[] }> {
    const queryParameter: { [key: string]: any } = {
        ids: ids.join(','),
    }
    if (options) queryParameter.market = options.market
    return await (
        await sendRequest({
            endpoint: 'albums',
            method: 'GET',
            token: token,
            queryParameter: queryParameter,
        })
    ).json()
}

/**
 * Get Spotify catalog information for a single album.
 * @param token - A valid user access token or your client credentials.
 * @param id - The Spotify ID of the album.
 * @param [options]
 * @returns An album object in JSON format.
 */
export async function getAlbum(
    token: Token | string,
    id: string,
    options?: {
        /** The market you’d like to request. Synonym for `country`. */
        market: string
    }
): Promise<AlbumObject> {
    return await (
        await sendRequest({
            endpoint: 'albums/{id}',
            method: 'GET',
            token: token,
            pathParameter: { id: id },
            ...((): object | void => {
                if (options) return { queryParameter: options }
            })(),
        })
    ).json()
}

/**
 * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
 * @param token - A valid user access token or your client credentials.
 * @param id - The Spotify ID of the album.
 * @param [options]
 * @returns An album object in JSON format.
 */
export async function getAlbumTracks(
    token: Token | string,
    id: string,
    options?: {
        /** The market you’d like to request. Synonym for `country`. */
        market?: string
        /** The maximum number of tracks to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first track to return. Default: 0 (the first object). Use with limit to get the next set of tracks. */
        offset?: number
    }
): Promise<PagingObject<SimplifiedTrackObject, 'album’s tracks'>> {
    return await (
        await sendRequest({
            endpoint: 'albums/{id}/tracks',
            method: 'GET',
            token: token,
            pathParameter: { id: id },
            queryParameter: options,
        })
    ).json()
}
