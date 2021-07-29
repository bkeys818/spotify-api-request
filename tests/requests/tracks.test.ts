import { token, trackIds } from '../global'
import {
    getSeveralTracks,
    getTrack,
    getAudioFeaturesforSeveralTracks,
    getAudioFeaturesforTrack,
    getAudioAnalysisforTrack,
} from '../../src/requests/tracks'
import {
    trackObject,
    audioFeaturesObject,
    audioAnalysisObject,
} from '../objects'

describe(getSeveralTracks, () => {
    test.concurrent('basic request', async () => {
        const res = await getSeveralTracks(token, trackIds)

        expect(res).toStrictEqual<typeof res>({
            tracks: res.tracks.map(trackObject),
        })
    })
})

describe(getTrack, () => {
    test.concurrent('basic request', async () => {
        const res = await getTrack(token, trackIds[0])

        expect(res).toStrictEqual<typeof res>(trackObject(res))
    })
})

describe(getAudioFeaturesforSeveralTracks, () => {
    test.concurrent('basic request', async () => {
        const res = await getAudioFeaturesforSeveralTracks(token, trackIds)

        expect(res).toStrictEqual<typeof res>({
            audio_features: res.audio_features.map(audioFeaturesObject),
        })
    })
})

describe(getAudioFeaturesforTrack, () => {
    test.concurrent('basic request', async () => {
        const res = await getAudioFeaturesforTrack(token, trackIds[0])

        expect(res).toStrictEqual<typeof res>(audioFeaturesObject())
    })
})

describe(getAudioAnalysisforTrack, () => {
    test.concurrent('basic request', async () => {
        const res = await getAudioAnalysisforTrack(token, trackIds[0])

        expect(res).toStrictEqual<typeof res>(audioAnalysisObject(res))
    })
})
