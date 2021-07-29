import {
    getMultipleShows,
    getShow,
    getShowEpisodes as getShowEpisodes,
} from '../../src/requests/shows'
import {
    simplifiedShowObject,
    showObject,
    pagingObject,
    simplifiedEpisodeObject,
} from '../objects'

// @ts-ignore
const token = global.token
const showIDs = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']

describe(getMultipleShows, () => {
    test.concurrent('basic request', async () => {
        const res = await getMultipleShows(token, showIDs)

        expect(res).toStrictEqual<typeof res>({
            shows: res.shows.map(simplifiedShowObject),
        })
    })
})

describe(getShow, () => {
    test.concurrent('basic request', async () => {
        const res = await getShow(token, showIDs[0])

        expect(res).toStrictEqual<typeof res>(showObject(res))
    })
})

describe(getShowEpisodes, () => {
    test.concurrent('basic request', async () => {
        const res = await getShowEpisodes(token, showIDs[0])

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'show’s episodes',
                testObj: simplifiedEpisodeObject,
            })
        )
    })
})
