import type { Globals } from '../../jest.config'
import { getMultipleEpisodes, getEpisode } from '../../src/api/episodes'
import { SimplifiedEpisodeObject, EpisodeObject } from '../../src/api/objects'
import { contextObject, testImageObject } from './global'
import { testSimplifiedShowObject } from './shows.test'

export function testSimplifiedEpisodeObject(value: SimplifiedEpisodeObject): SimplifiedEpisodeObject {
    const expectedObj: SimplifiedEpisodeObject = {
        ...contextObject('episode'),
        audio_preview_url: value.audio_preview_url ? expect.any(String) : null,
        description: expect.any(String),
        duration_ms: expect.any(Number),
        explicit: expect.any(Boolean),
        html_description: expect.any(String),
        id: expect.any(String),
        images: expect.any(Array),
        is_externally_hosted: expect.any(Boolean),
        is_playable: expect.any(Boolean),
        language: expect.any(String),
        name: expect.any(String),
        release_date: expect.any(String),
        release_date_precision: expect.stringMatching(/year|month|day/),
    }

    if (value.resume_point) expectedObj.resume_point = {
        fully_played: expect.any(Boolean),
        resume_position_ms: expect.any(Number)
    }

    if (value.languages) {
        expectedObj.languages = expect.any(Array)
        value.languages.forEach(language => {
            expect(language).toEqual(expect.any(String))
        })
    }

    expect(value).toMatchObject(expectedObj)

    value.images.forEach(testImageObject)

    return expectedObj
}

export function testEpisodeObject(value: EpisodeObject): EpisodeObject {
    const expectedObj: EpisodeObject = {
        ...testSimplifiedEpisodeObject(value),
        show: testSimplifiedShowObject(value.show),
        uri: expect.any(String),
    }
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

const token = (global as unknown as Globals).testData.token
const episodeIds = ['12KkLKHryOF9tvBuHsiHwS', '6qAXNDd2RhdZVeRRLcngzo']

test(getMultipleEpisodes.name, async () => {
    const res = await getMultipleEpisodes(token, episodeIds)
    
    expect(res).toMatchObject<typeof res>({
        episodes: expect.any(Array)
    })

    res.episodes.forEach(testEpisodeObject)
})

test(getEpisode.name, async () => {
    const res = await getEpisode(token, episodeIds[0])
    testEpisodeObject(res)
})