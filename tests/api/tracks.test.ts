import {
    getSeveralTracks,
    getTrack,
    getAudioFeaturesforSeveralTracks,
    getAudioFeaturesforTrack,
    getAudioAnalysisforTrack,
} from '../../src/api/tracks'
import {
    SimplifiedTrackObject,
    TrackObject,
    AudioFeaturesObject,
} from '../../src/api/objects'
import { contextObject, externalIdObject } from './global'
import { simplifiedAlbumObject } from './albums.test'
import { simplifiedArtistObject } from './artists.test'

export const tracksUrlRegExp =
    /https:\/\/api\.spotify\.com\/v1\/tracks\/[a-z\d]+/i

export function simplifiedTrackObject(
    value: SimplifiedTrackObject
): SimplifiedTrackObject {
    const expectedObj: SimplifiedTrackObject = {
        ...contextObject('track'),
        artists: expect.arrayContaining<typeof value.artists[number]>([
            simplifiedArtistObject,
        ]),
        available_markets: expect.arrayContaining<
            typeof value.available_markets[number]
        >([expect.any(String)]),
        disc_number: expect.any(Number),
        duration_ms: expect.any(Number),
        explicit: expect.any(Boolean),
        id: expect.any(String),
        is_local: expect.any(Boolean),
        name: expect.any(String),
        preview_url: value.preview_url ? expect.any(String) : null,
        track_number: expect.any(Number),
    }

    if (value.is_playable) expectedObj.is_playable = expect.any(Boolean)

    if (value.linked_from)
        expectedObj.linked_from = {
            external_urls: {
                spotify: expect.any(String),
            },
            href: expect.stringMatching(tracksUrlRegExp),
            id: expect.any(String),
            type: 'track',
            uri: expect.any(String),
        }

    if (value.restrictions)
        expectedObj.restrictions = {
            reason: expect.stringMatching(/market|product|explicit/),
        }

    return expectedObj
}

export function trackObject(value: TrackObject): TrackObject {
    const expectedObj: TrackObject = {
        ...simplifiedTrackObject(value),
        album: simplifiedAlbumObject(value.album),
        external_ids: externalIdObject(value.external_ids),
        popularity: expect.any(Number),
    }

    if (value.episode) expectedObj.episode = expect.any(Boolean)
    if (value.track) expectedObj.track = expect.any(Boolean)

    return expectedObj
}

// @ts-ignore
const token = global.token
export const trackIds = ['3WWAvWDBQANpJeNbvVbjMg', '0TXK1dsiK9lkeaK6neSP2j']

test(getSeveralTracks.name, async () => {
    const res = await getSeveralTracks(token, trackIds)

    expect(res).toMatchObject<typeof res>({
        tracks: expect.arrayContaining<typeof res.tracks[number]>(
            res.tracks.map(trackObject)
        ),
    })
})

test(getTrack.name, async () => {
    const res = await getTrack(token, trackIds[0])

    expect(res).toMatchObject<typeof res>(trackObject(res))
})

const audioFeaturesObject: AudioFeaturesObject = {
    acousticness: expect.any(Number),
    analysis_url: expect.any(String),
    danceability: expect.any(Number),
    duration_ms: expect.any(Number),
    energy: expect.any(Number),
    id: expect.any(String),
    instrumentalness: expect.any(Number),
    key: expect.any(Number),
    liveness: expect.any(Number),
    loudness: expect.any(Number),
    mode: expect.any(Number),
    speechiness: expect.any(Number),
    tempo: expect.any(Number),
    time_signature: expect.any(Number),
    track_href: expect.stringMatching(tracksUrlRegExp),
    type: 'audio_features',
    uri: expect.any(String),
    valence: expect.any(Number),
}

test(getAudioFeaturesforSeveralTracks.name, async () => {
    const res = await getAudioFeaturesforSeveralTracks(token, trackIds)

    expect(res).toMatchObject<typeof res>({
        audio_features: expect.arrayContaining<
            typeof res.audio_features[number]
        >([audioFeaturesObject]),
    })
})

test(getAudioFeaturesforTrack.name, async () => {
    const res = await getAudioFeaturesforTrack(token, trackIds[0])

    expect(res).toMatchObject<typeof res>(audioFeaturesObject)
})

test(getAudioAnalysisforTrack.name, async () => {
    const res = await getAudioAnalysisforTrack(token, trackIds[0])

    expect(res).toMatchObject<typeof res>({
        meta: {
            analyzer_version: expect.stringMatching(/\d+\.\d+\.\d+/),
            platform: expect.any(String),
            detailed_status: expect.any(String),
            status_code: expect.any(Number),
            timestamp: expect.any(Number),
            analysis_time: expect.any(Number),
            input_process: expect.any(String),
        },
        track: {
            num_samples: expect.any(Number),
            duration: expect.any(Number),
            sample_md5: expect.any(String),
            offset_seconds: expect.any(Number),
            window_seconds: expect.any(Number),
            analysis_sample_rate: expect.any(Number),
            analysis_channels: expect.any(Number),
            end_of_fade_in: expect.any(Number),
            start_of_fade_out: expect.any(Number),
            loudness: expect.any(Number),
            tempo: expect.any(Number),
            tempo_confidence: expect.any(Number),
            time_signature: expect.any(Number),
            time_signature_confidence: expect.any(Number),
            key: expect.any(Number),
            key_confidence: expect.any(Number),
            mode: expect.any(Number),
            mode_confidence: expect.any(Number),
            codestring: expect.any(String),
            code_version: expect.any(Number),
            echoprintstring: expect.any(String),
            echoprint_version: expect.any(Number),
            synchstring: expect.any(String),
            synch_version: expect.any(Number),
            rhythmstring: expect.any(String),
            rhythm_version: expect.any(Number),
        },
        bars: expect.arrayContaining<typeof res.bars[number]>([{
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
        }]),
        beats: expect.arrayContaining<typeof res.beats[number]>([{
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
        }]),
        sections: expect.arrayContaining<typeof res.sections[number]>([{
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
            loudness: expect.any(Number),
            tempo: expect.any(Number),
            tempo_confidence: expect.any(Number),
            key: expect.any(Number),
            key_confidence: expect.any(Number),
            mode: expect.any(Number),
            mode_confidence: expect.any(Number),
            time_signature: expect.any(Number),
            time_signature_confidence: expect.any(Number),
        }]),
        segments: expect.arrayContaining<typeof res.segments[number]>([{
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
            loudness_start: expect.any(Number),
            loudness_max_time: expect.any(Number),
            loudness_max: expect.any(Number),
            loudness_end: expect.any(Number),
            pitches: expect.arrayContaining<typeof res.segments[number]['pitches'][number]>([
                expect.any(Number)
            ]),
            timbre: expect.arrayContaining<typeof res.segments[number]['timbre'][number]>([
                expect.any(Number)
            ])
        }]),
        tatums: expect.arrayContaining<typeof res.tatums[number]>([{
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
        }]),
    })
})
