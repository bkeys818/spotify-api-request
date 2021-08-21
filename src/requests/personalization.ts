import { sendRequest } from '../global'
/**
 * Get the current user’s top artists or tracks based on calculated affinity.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of the current user.<br>Getting details of a user’s top artists and tracks requires authorization of the `user-top-read` scope. See [Using Scopes](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).
 * @param type - The type of entity to return.
 * @param [options]
 * @returns A {@link PagingObject paging object} of {@link ArtistObject Artists} or {@link TrackObject Tracks}.
 */
export async function getUserTopArtistsandTracks<T extends 'artists' | 'tracks'>(
    token: Token | string,
    type: T,
    options?: {
        /** 
         * Over what time frame the affinities are computed.
         * 
         * Valid values:
         * - `long_term` - Calculated from several years of data and including all new data as it becomes available.
         * - `medium_term` - Approximately last 6 months. (Default)
         * - `short_term` - Approximately last 4 weeks.
         */
        timeRange?: 'long_term' | 'medium_term' | 'short_term'
        /** The number of entities to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first entity to return. Default: 0 (i.e., the first track). Use with limit to get the next set of entities. */
        offset?: number
    }
): Promise<PagingObject<T extends 'artists' ? ArtistObject : TrackObject>> {
    return await (
        await sendRequest({
            endpoint: 'me/top/{type}',
            method: 'GET',
            token: token,
            pathParameter: { type: type },
            queryParameter: options,
        })
    ).json()
}
