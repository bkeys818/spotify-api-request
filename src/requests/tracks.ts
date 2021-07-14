import { sendRequest } from '../send-request'
import type { Token } from '../authorize'
import type {
    TrackObject,
    AudioFeaturesObject,
    AudioAnalysisObject,
} from '../objects'

/**
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {string[]} ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the tracks. Maximum: 50 IDs.
 * @param {Object} [options]
 * @returns {Promise<{ tracks: TrackObject[] }>} An object whose key is `tracks` and whose value is an array of {@link TrackObject track objects}.
 */
export async function getSeveralTracks(
    token: Token | string,
    ids: string[],
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
    }
): Promise<{ tracks: TrackObject[] }> {
    const queryParameter: { [key: string]: any } = { ids: ids }
    if (options && options.market) queryParameter.market = options.market
    return await (
        await sendRequest({
            endpoint: 'tracks',
            method: 'GET',
            token: token,
            queryParameter: queryParameter,
        })
    ).json()
}

/**
 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
 * @param {Object} [options]
 * @returns {Promise<TrackObject>} A {@link TrackObject track object}.
 */
export async function getTrack(
    token: Token | string,
    id: string,
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
    }
): Promise<TrackObject> {
    return await (
        await sendRequest({
            endpoint: 'tracks/{id}',
            method: 'GET',
            token: token,
            pathParameter: { id: id },
            queryParameter: options,
        })
    ).json()
}

/**
 * Get audio features for multiple tracks based on their Spotify IDs.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {string[]} ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the tracks. Maximum: 100 IDs.
 * @returns {Promise<{ audio_features: AudioFeaturesObject[] }>} An object whose key is `"audio_features"` and whose value is an array of {@link AudioFeaturesObject audio features objects}.
 */
export async function getAudioFeaturesforSeveralTracks(
    token: Token | string,
    ids: string[]
): Promise<{ audio_features: AudioFeaturesObject[] }> {
    return await (
        await sendRequest({
            endpoint: 'audio-features',
            method: 'GET',
            token: token,
            queryParameter: { ids: ids },
        })
    ).json()
}

/**
 * Get audio feature information for a single track identified by its unique Spotify ID.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
 * @returns {Promise<AudioFeaturesObject>} An {@link AudioFeaturesObject audio features object}.
 */
export async function getAudioFeaturesforTrack(
    token: Token | string,
    id: string
): Promise<AudioFeaturesObject> {
    return await (
        await sendRequest({
            endpoint: 'audio-features/{id}',
            method: 'GET',
            token: token,
            pathParameter: { id: id },
        })
    ).json()
}

/**
 * Get a detailed audio analysis for a single track identified by its unique Spotify ID.
 * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param {string} id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
 * @returns {Promise<AudioAnalysisObject>} An {@link AudioAnalysisObject audio analysis object}.
 */
export async function getAudioAnalysisforTrack(
    token: Token | string,
    id: string
): Promise<AudioAnalysisObject> {
    return await (
        await sendRequest({
            endpoint: 'audio-analysis/{id}',
            method: 'GET',
            token: token,
            pathParameter: { id: id },
        })
    ).json()
}
