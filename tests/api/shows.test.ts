import {
    getMultipleShows,
    getShow,
    getShowEpisodes as getShowEpisodes,
} from '../../src/api/shows'
import {
    simplifiedShowObject,
    showObject,
    pagingObject,
    simplifiedEpisodeObject,
} from './objects'

// @ts-ignore
const token = global.token
export const showIDs = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']

test(getMultipleShows.name, async () => {
    const res = await getMultipleShows(token, showIDs)

    expect(res).toStrictEqual<typeof res>({
        shows: res.shows.map(simplifiedShowObject),
    })
})

test(getShow.name, async () => {
    const res = await getShow(token, showIDs[0])

    expect(res).toStrictEqual<typeof res>(showObject(res))
})

test(getShowEpisodes.name, async () => {
    const res = await getShowEpisodes(token, showIDs[0])

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'show’s episodes',
            testObj: simplifiedEpisodeObject,
        })
    )
})
