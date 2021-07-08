import {
    getUsersSavedAlbums,
    getUsersSavedEpisodes,
    getUsersSavedShows,
    getUsersSavedTracks,
    checkUsersSavedAlbums,
    checkUsersSavedEpisodes,
    checkUsersSavedShows,
    checkUsersSavedTracks,
} from '../../src/api/library'
import {
    arrayOf,
    pagingObject,
    albumObject,
    episodeObject,
    showObject,
    trackObject,
} from './objects'

// @ts-ignore
const token = global.token
const albumIDs = ['7gsWAHLeT0w7es6FofOXk1', '13dXX35pYjr8FqRla40K2a']
const episodeIds = ['12KkLKHryOF9tvBuHsiHwS', '6qAXNDd2RhdZVeRRLcngzo']
const showIDs = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']
const trackIds = ['3WWAvWDBQANpJeNbvVbjMg', '0TXK1dsiK9lkeaK6neSP2j']

test(getUsersSavedAlbums.name, async () => {
    const res = await getUsersSavedAlbums(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'my albums',
            testObj: albumObject
        })
    )
})

test(getUsersSavedEpisodes.name, async () => {
    const res = await getUsersSavedEpisodes(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'my episodes',
            testObj: episodeObject
        })
    )
})

test(getUsersSavedShows.name, async () => {
    const res = await getUsersSavedShows(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'my shows',
            testObj: showObject
        })
    )
})

test(getUsersSavedTracks.name, async () => {
    const res = await getUsersSavedTracks(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'my tracks',
            testObj: trackObject
        })
    )
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
