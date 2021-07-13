import {
    getSeveralTracks,
    getTrack,
    getAudioFeaturesforSeveralTracks,
    getAudioFeaturesforTrack,
    getAudioAnalysisforTrack,
} from '../../src/api/tracks'
import {
    trackObject,
    audioFeaturesObject,
    audioAnalysisObject,
} from './objects'

// @ts-ignore
const token = global.token
const trackIds = ['3WWAvWDBQANpJeNbvVbjMg', '0TXK1dsiK9lkeaK6neSP2j']

test(getSeveralTracks.name, async () => {
    const res = await getSeveralTracks(token, trackIds)

    expect(res).toStrictEqual<typeof res>({
        tracks: res.tracks.map(trackObject),
    })
})

test(getTrack.name, async () => {
    const res = await getTrack(token, trackIds[0])

    expect(res).toStrictEqual<typeof res>(trackObject(res))
})

test(getAudioFeaturesforSeveralTracks.name, async () => {
    const res = await getAudioFeaturesforSeveralTracks(token, trackIds)

    expect(res).toStrictEqual<typeof res>({
        audio_features: res.audio_features.map(audioFeaturesObject),
    })
})

test(getAudioFeaturesforTrack.name, async () => {
    const res = await getAudioFeaturesforTrack(token, trackIds[0])

    expect(res).toStrictEqual<typeof res>(audioFeaturesObject())
})

test(getAudioAnalysisforTrack.name, async () => {
    const res = await getAudioAnalysisforTrack(token, trackIds[0])

    expect(res).toStrictEqual<typeof res>(audioAnalysisObject(res))
})
