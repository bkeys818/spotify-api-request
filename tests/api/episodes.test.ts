import { getMultipleEpisodes, getEpisode } from '../../src/api/episodes'
import { SimplifiedEpisodeObject, EpisodeObject } from '../../src/api/objects'
import { contextObject, imageObject } from './global'
import { simplifiedShowObject } from './shows.test'

export const episodesUrlRegExp =
    /https:\/\/api\.spotify\.com\/v1\/episodes\/[a-z\d]+/i

export function simplifiedEpisodeObject(
    value: SimplifiedEpisodeObject
): SimplifiedEpisodeObject {
    const expectedObj: SimplifiedEpisodeObject = {
        ...contextObject('episode'),
        audio_preview_url: value.audio_preview_url ? expect.any(String) : null,
        description: expect.any(String),
        duration_ms: expect.any(Number),
        explicit: expect.any(Boolean),
        html_description: expect.any(String),
        id: expect.any(String),
        images: expect.arrayContaining<typeof value['images'][number]>(
            value.images.map(imageObject)
        ),
        is_externally_hosted: expect.any(Boolean),
        is_playable: expect.any(Boolean),
        language: expect.any(String),
        name: expect.any(String),
        release_date: expect.any(String),
        release_date_precision: expect.stringMatching(/year|month|day/),
    }

    if (value.resume_point)
        expectedObj.resume_point = {
            fully_played: expect.any(Boolean),
            resume_position_ms: expect.any(Number),
        }

    if (value.languages)
        expectedObj.languages = expect.arrayContaining([expect.any(String)])

    return expectedObj
}

export function episodeObject(value: EpisodeObject): EpisodeObject {
    return {
        ...simplifiedEpisodeObject(value),
        show: simplifiedShowObject(value.show),
        uri: expect.any(String),
    }
}

// @ts-ignore
const token = global.token
export const episodeIds = ['12KkLKHryOF9tvBuHsiHwS', '6qAXNDd2RhdZVeRRLcngzo']

test(getMultipleEpisodes.name, async () => {
    const res = await getMultipleEpisodes(token, episodeIds)

    expect(res).toMatchObject<typeof res>({
        episodes: expect.arrayContaining(res.episodes.map(episodeObject)),
    })
})

test(getEpisode.name, async () => {
    const res = await getEpisode(token, episodeIds[0])
    expect(res).toMatchObject<typeof res>(episodeObject(res))
})
