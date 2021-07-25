import { sendRequest } from '../global'
import type { Token } from '../authorize'
import type { EpisodeObject } from '../objects'

/**
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {String[]} ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episodes. Maximum: 50 IDs.
 * @param {Object} options
 * @returns {Promise<{ episodes: EpisodeObject[] }>} An object whose key is `episodes` and whose value is an array of {@link EpisodeObject episode objects}.
 */
export async function getMultipleEpisodes(
    token: Token | string,
    ids: string[],
    options?: {
        /**
         * An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). If a country code is specified, only shows and episodes that are available in that market will be returned.
         *
         * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the content is considered unavailable for the client.*
         *
         * Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).
         */
        market: string
    }
): Promise<{ episodes: EpisodeObject[] }> {
    const queryParameter: { [key: string]: any } = { ids: ids }
    if (options) queryParameter.market = options.market
    return await (
        await sendRequest({
            endpoint: 'episodes',
            method: 'GET',
            token: token,
            queryParameter: queryParameter,
        })
    ).json()
}

/**
 * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode.
 * @param {Object} [options]
 * @returns {Promise<EpisodeObject>} An {@link EpisodeObject episode object}.
 */
export async function getEpisode(
    token: Token | string,
    id: string,
    options?: {
        /**
         * An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). If a country code is specified, only shows and episodes that are available in that market will be returned.
         *
         * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
         *
         * *Note: If neither market or user country are provided, the content is considered unavailable for the client.*
         *
         * Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).
         */
        market?: string
    }
): Promise<EpisodeObject> {
    return await (
        await sendRequest({
            endpoint: 'episodes/{id}',
            method: 'GET',
            token: token,
            pathParameter: { id: id },
            queryParameter: options,
        })
    ).json()
}
