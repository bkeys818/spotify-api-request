import sendRequest from '../send-requests'
import type { Token, Responses } from 'spotify-objects'

/**
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the tracks. Maximum: 50 IDs.
 * @param [options]
 * @returns An object whose key is `tracks` and whose value is an array of {@link TrackObject track objects}.
 */
export const getMultipleTracks = (
    token: Token | string,
    ids: string[],
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
    }
): Promise<Responses.getMultipleTracks> =>
    sendRequest({
        endpoint: 'tracks',
        token: token,
        queryParameter: { ids: ids, ...options },
    })

/**
 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
 * @param [options]
 * @returns A {@link TrackObject track object}.
 */
export const getTrack = (
    token: Token | string,
    id: string,
    options?: {
        /** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
        market?: string
    }
): Promise<Responses.getTrack> =>
    sendRequest({
        endpoint: `tracks/${id}`,
        token: token,
        queryParameter: options,
    })

/**
 * Get audio features for multiple tracks based on their Spotify IDs.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param ids - A comma-separated list of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the tracks. Maximum: 100 IDs.
 * @returns An object whose key is `"audio_features"` and whose value is an array of {@link AudioFeaturesObject audio features objects}.
 */
export const getAudioFeaturesForSeveralTracks = (
    token: Token | string,
    ids: string[]
): Promise<Responses.getAudioFeaturesForSeveralTracks> =>
    sendRequest({
        endpoint: 'audio-features',
        token: token,
        queryParameter: { ids: ids },
    })

/**
 * Get audio feature information for a single track identified by its unique Spotify ID.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
 * @returns An {@link AudioFeaturesObject audio features object}.
 */
export const getAudioFeaturesForTrack = (
    token: Token | string,
    id: string
): Promise<Responses.getAudioFeaturesForTrack> =>
    sendRequest({
        endpoint: `audio-features/${id}`,
        token: token,
    })

/**
 * Get a detailed audio analysis for a single track identified by its unique Spotify ID.
 * @param token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
 * @param id - The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track.
 * @returns An {@link AudioAnalysisObject audio analysis object}.
 */
export const getAudioAnalysisForTrack = (
    token: Token | string,
    id: string
): Promise<Responses.getAudioAnalysisForTrack> =>
    sendRequest({
        endpoint: `audio-analysis/${id}`,
        token: token,
    })
