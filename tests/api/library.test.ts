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
import { albumIDs } from './albums.test'
import { episodeIds } from './episodes.test'
import { showIDs } from './shows.test'
import { trackIds } from './tracks.test'

// @ts-ignore
const token = global.token


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
