import { getMultipleEpisodes, getEpisode } from '../../src/api/episodes'
import { episodeObject } from './objects'

// @ts-ignore
const token = global.token
export const episodeIds = ['12KkLKHryOF9tvBuHsiHwS', '6qAXNDd2RhdZVeRRLcngzo']

test(getMultipleEpisodes.name, async () => {
    const res = await getMultipleEpisodes(token, episodeIds)

    expect(res).toStrictEqual<typeof res>({
        episodes: res.episodes.map(episodeObject),
    })
})

test(getEpisode.name, async () => {
    const res = await getEpisode(token, episodeIds[0])

    expect(res).toStrictEqual<typeof res>(episodeObject(res))
})
