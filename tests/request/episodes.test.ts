import { getMultipleEpisodes, getEpisode } from '../../src/requests/episodes'
import { episodeObject } from '../objects'

// @ts-ignore
const token = global.token
const episodeIds = ['12KkLKHryOF9tvBuHsiHwS', '6qAXNDd2RhdZVeRRLcngzo']

test(getMultipleEpisodes.name, async () => {
    const res = await getMultipleEpisodes(token, episodeIds)

    expect(res).toStrictEqual<typeof res>({
        episodes: res.episodes.map((episode) =>
            episode === null ? null : episodeObject(episode)
        ),
    })
})

test(getEpisode.name, async () => {
    const res = await getEpisode(token, episodeIds[0])

    expect(res).toStrictEqual<typeof res>(episodeObject(res))
})
