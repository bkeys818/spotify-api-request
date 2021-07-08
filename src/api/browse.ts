import { sendRequest } from '../request'
import type { Token } from '../authorize'
import type {
    SimplifiedAlbumObject,
    PagingObject,
    PlaylistObject,
    CategoryObject,
    RecommendationsObject,
} from './objects'

/**
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {Object} options
 * @returns {Promise<{albums: PagingObject<SimplifiedAlbumObject,'new releases'>}>} The response contains a `message` and an `albums` object. The `albums` object contains an array of {@link SimplifiedAlbumObject simplified album objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getAllNewReleases(
    token: Token | string,
    options?: {
        /** A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries. */
        country?: string
        /** The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first item to return. Default: 0 (the first object). Use with `limit` to get the next set of items. */
        offset?: number
    }
): Promise<{ albums: PagingObject<SimplifiedAlbumObject, 'new releases'> }> {
    return await (
        await sendRequest({
            endpoint: 'browse/new-releases',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player’s ‘Browse’ tab).
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {Object} [options]
 * @returns {Promise<{message: string, playlists: PagingObject<PlaylistObject, 'playlists'>}>} An array of simplified {@link PlaylistObject playlist objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getAllFeaturedPlaylists(
    token: Token | string,
    options?: {
        /** A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries. */
        country?: string
        /** The desired language, consisting of a lowercase [ISO 639-1 language code](http://en.wikipedia.org/wiki/ISO_639-1) and an uppercase [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning “Spanish (Mexico)”. Provide this parameter if you want the results returned in a particular language (where available). Note that, if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE`will return a list of categories relevant to Sweden but as German language strings. */
        locale?: string
        /** A timestamp in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601): `yyyy-MM-ddTHH:mm:ss`. Use this parameter to specify the user’s local time to get results tailored for that specific date and time in the day. If not provided, the response defaults to the current UTC time. Example: “2014-10-23T09:00:00” for a user whose local time is 9AM. If there were no featured playlists (or there is no data) at the specified time, the response will revert to the current UTC time. */
        timestamp?: string
        /** The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first item to return. Default: 0 (the first object). Use with `limit` to get the next set of items. */
        offset?: number
    }
): Promise<{
    message: string
    playlists: PagingObject<PlaylistObject, 'playlists'>
}> {
    return await (
        await sendRequest({
            endpoint: 'browse/featured-playlists',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {Object} [options]
 * @returns {Promise<{categories: PagingObject<CategoryObject,'categories'>}>} An object with a categories field, with an array of {@link CategoryObjects category objects} (wrapped in a {@link PagingObject paging object}).
 */
export async function getAllCategories(
    token: Token | string,
    options?: {
        /** A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want to narrow the list of returned categories to those relevant to a particular country. If omitted, the returned items will be globally relevant. */
        country?: string
        /** The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1)language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning “Spanish (Mexico)”. Provide this parameter if you want the category metadata returned in a particular language. Note that, if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE`will return a list of categories relevant to Sweden but as German language strings. */
        locale?: string
        /** The maximum number of categories to return. Default: 20. Minimum: 1. Maximum: 50. */
        limit?: number
        /** The index of the first item to return. Default: 0 (the first object). Use with `limit` to get the next set of categories. */
        offset?: number
    }
): Promise<{ categories: PagingObject<CategoryObject, 'categories'> }> {
    return await (
        await sendRequest({
            endpoint: 'browse/categories',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string} categoryId - The [Spotify category ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids)for the category.
 * @param {Object} [options]
 * @returns {Promise<CategoryObject>} A {@link CategoryObject category object}.
 */
export async function getCategory(
    token: Token | string,
    categoryId: string,
    options?: {
        /** A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.*/
        country?: string
        /** The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1)language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning "Spanish (Mexico)". Provide this parameter if you want the category strings returned in a particular language. Note that, if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English).*/
        locale?: string
    }
): Promise<CategoryObject> {
    return await (
        await sendRequest({
            endpoint: 'browse/categories/{category_id}',
            method: 'GET',
            token: token,
            pathParameter: {
                category_id: categoryId,
            },
            queryParameter: options,
        })
    ).json()
}

/**
 * Get a list of Spotify playlists tagged with a particular category.
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {string} categoryId - The [Spotify category ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the category.
 * @param {Object} [options]
 * @returns {Promise<PagingObject<PlaylistObject,'category’s playlists'>>} An array of simplified {@link PlaylistObject playlist objects} (wrapped in a {@link PagingObject paging object})
 */
export async function getCategoryPlaylists(
    token: Token | string,
    categoryId: string,
    options?: {
        /** A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.*/
        country?: string
        /** The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.*/
        limit?: number
        /** The index of the first item to return. Default: 0 (the first object). Use with `limit` to get the next set of items.*/
        offset?: number
    }
): Promise<PagingObject<PlaylistObject, 'category’s playlists'>> {
    return await (
        await sendRequest({
            endpoint: 'browse/categories/{category_id}/playlists',
            method: 'GET',
            token: token,
            pathParameter: {
                category_id: categoryId,
            },
            queryParameter: options,
        })
    ).json()
}

/**
 * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
 * @param {Token} token - A valid user access token or your client credentials.
 * @param {Object} options
 * @returns {Promise<RecommendationsObject>} A {@link RecommendationsObject recommendations response object}
 */
export async function getRecommendations(
    token: Token | string,
    options: {
        /** The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20. Minimum: 1. Maximum: 100. */
        limit?: number
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide). Because `min_*`, `max_*` and `target_*` are applied to pools before relinking, the generated results may not precisely match the filters applied. Original, non-relinked tracks are available via the `linked_from` attribute of the [relinked track response](https://developer.spotify.com/documentation/general/guides/track-relinking-guide). */
        market?: string
        /** A comma separated list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`. */
        seed_artists: string
        /** A comma separated list of any genres in the set of [available genre seeds](#available-genre-seeds).  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`. */
        seed_genres: string
        /** A comma separated list of [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`. */
        seed_tracks: string
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_acousticness?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_acousticness?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_acousticness?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_danceability?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_danceability?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_danceability?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_duration_ms?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_duration_ms?: number
        /** Target duration of the track (ms) */
        target_duration_ms?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_energy?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_energy?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_energy?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_instrumentalness?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_instrumentalness?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_instrumentalness?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_key?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_key?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_key?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_liveness?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_liveness?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_liveness?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_loudness?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_loudness?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_loudness?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_mode?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_mode?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_mode?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_popularity?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_popularity?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_popularity?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_speechiness?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_speechiness?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_speechiness?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_tempo?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_tempo?: number
        /** Target tempo (BPM) */
        target_tempo?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_time_signature?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_time_signature?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_time_signature?: number
        /** For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute. */
        min_valence?: number
        /** For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental. */
        max_valence?: number
        /** For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results. */
        target_valence?: number
    }
): Promise<RecommendationsObject> {
    return await (
        await sendRequest({
            endpoint: 'recommendations',
            method: 'GET',
            token: token,
            queryParameter: options,
        })
    ).json()
}

/**
 * Retrieve a list of available genres seed parameter values for [recommendations](https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-recommendations).
 * @param {Token} token - A valid user access token or your client credentials.
 * @returns {Promise<RecommendationsObject>} A {@link RecommendationsObject recommendations response object}
 */
export async function getRecommendationGenres(
    token: Token | string
): Promise<RecommendationsObject> {
    return await (
        await sendRequest({
            endpoint: 'recommendations/available-genre-seeds',
            method: 'GET',
            token: token,
        })
    ).json()
}
