import { token, albumIDs, episodeIds, showIDs, trackIds} from '../global'
import {
    getUsersSavedAlbums,
    getUsersSavedEpisodes,
    getUsersSavedShows,
    getUsersSavedTracks,
    checkUsersSavedAlbums,
    checkUsersSavedEpisodes,
    checkUsersSavedShows,
    checkUsersSavedTracks,
} from '../../src/requests/library'
import { arrayOf, pagingObject, savedObject } from '../objects'

describe(getUsersSavedAlbums, () => {
    test.concurrent('basic request', async () => {
        const res = await getUsersSavedAlbums(token)

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'my albums',
                testObj: (value: typeof res.items[number]) => {
                    return savedObject(value)
                },
            })
        )
    })
})

describe(getUsersSavedEpisodes, () => {
    test.concurrent('basic request', async () => {
        const res = await getUsersSavedEpisodes(token)

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'my episodes',
                testObj: (value: typeof res.items[number]) => {
                    return savedObject(value)
                },
            })
        )
    })
})

describe(getUsersSavedShows, () => {
    test.concurrent('basic request', async () => {
        const res = await getUsersSavedShows(token)

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'my shows',
                testObj: (value: typeof res.items[number]) => {
                    return savedObject(value)
                },
            })
        )
    })
})

describe(getUsersSavedTracks, () => {
    test.concurrent('basic request', async () => {
        const res = await getUsersSavedTracks(token)

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'my tracks',
                testObj: (value: typeof res.items[number]) => {
                    return savedObject(value)
                },
            })
        )
    })
})

test.each([
    [checkUsersSavedAlbums.name, checkUsersSavedAlbums, albumIDs],
    [checkUsersSavedEpisodes.name, checkUsersSavedEpisodes, episodeIds],
    [checkUsersSavedShows.name, checkUsersSavedShows, showIDs],
    [checkUsersSavedTracks.name, checkUsersSavedTracks, trackIds],
])('%s', async (_, request, ids) => {
    const res = await request(token, ids)

    expect(res).toStrictEqual(arrayOf(res, Boolean))
})
