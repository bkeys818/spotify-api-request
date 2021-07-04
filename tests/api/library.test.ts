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
    url,
} from './objects'
import { albumIDs } from './albums.test'
import { episodeIds } from './episodes.test'
import { showIDs } from './shows.test'
import { trackIds } from './tracks.test'

// @ts-ignore
const token = global.token

test.each([
    [
        getUsersSavedAlbums.name,
        getUsersSavedAlbums,
        /albums\/[a-z\d]+/,
        albumObject,
    ],
    [
        getUsersSavedEpisodes.name,
        getUsersSavedEpisodes,
        /episodes\/[a-z\d]+/,
        episodeObject,
    ],
    [
        getUsersSavedShows.name,
        getUsersSavedShows,
        /shows\/[a-z\d]+/,
        showObject,
    ],
    [
        getUsersSavedTracks.name,
        getUsersSavedTracks,
        /tracks\/[a-z\d]+/,
        trackObject,
    ],
])('%s', async (_, request, urlRegExp, test) => {
    const res = await request(token)

    expect(res).toStrictEqual<typeof res>(
        // @ts-ignore
        pagingObject<typeof res.items[number]>({
            value: res,
            url: url(urlRegExp, true),
            // @ts-ignore
            testObj: test,
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
