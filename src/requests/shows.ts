import sendRequest from '../send-requests'
import type { Token, Responses } from 'spotify-objects'

/**
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param ids - A list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the shows. Maximum: 50 IDs.
 * @param [options]
 * @returns An object whose key is `shows` and whose value is an array of {@link SimplifiedShowObject simple show object}.
 */
export const getMultipleShows = (
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
): Promise<Responses.getMultipleShows> =>
    sendRequest({
        endpoint: 'shows',
        token: token,
        queryParameter: { ids: ids, ...options },
    })

/**
 * Get Spotify catalog information for a single show identified by its unique Spotify ID.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the show.
 * @param [options]
 * @returns A {@link ShowObject show object}
 */
export const getShow = (
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
        market: string
    }
): Promise<Responses.getShow> =>
    sendRequest({
        endpoint: `shows/${id}`,
        token: token,
        queryParameter: options,
    })

/**
 * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
 * @param token - valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the show.
 * @param [options]
 * @returns
 */
export const getShowEpisodes = (
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
        /** The maximum number of episodes to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first episode to return. Default: 0 (the first object). Use with limit to get the next set of episodes. */
        offset?: number
    }
): Promise<Responses.getShowEpisodes> =>
    sendRequest({
        endpoint: `shows/${id}/episodes`,
        token: token,
        queryParameter: options,
    })
