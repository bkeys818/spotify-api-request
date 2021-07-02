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
import { albumsUrlRegExp, albumObject, albumIDs } from './albums.test'
import { episodesUrlRegExp, episodeObject, episodeIds } from './episodes.test'
import { showsUrlRegExp, showObject, showIDs } from './shows.test'
import { tracksUrlRegExp, trackObject, trackIds } from './tracks.test'

// @ts-ignore
const token = global.token

test.each([
    [
        getUsersSavedAlbums.name,
        getUsersSavedAlbums,
        albumsUrlRegExp,
        albumObject,
    ],
    [
        getUsersSavedEpisodes.name,
        getUsersSavedEpisodes,
        episodesUrlRegExp,
        episodeObject,
    ],
    [
        getUsersSavedShows.name,
        getUsersSavedShows,
        showsUrlRegExp,
        showObject,
    ],
    [
        getUsersSavedTracks.name,
        getUsersSavedTracks,
        tracksUrlRegExp,
        trackObject,
    ],
])('%s', async (_, request, urlRegExp, testItem) => {
    const res = await request(token)

    const urlRegExpQuery = new RegExp(urlRegExp.source + '(\\?.+)?', 'i')
    expect(res).toMatchObject<typeof res>({
        href: expect.stringMatching(urlRegExpQuery),
        items: expect.arrayContaining<typeof res['items'][number]>(
            // @ts-ignore
            res.items.map(testItem)
        ),
        limit: expect.any(Number),
        next: res.next ? expect.stringMatching(urlRegExpQuery) : null,
        offset: expect.any(Number),
        previous: res.previous ? expect.stringMatching(urlRegExpQuery) : null,
        total: expect.any(Number),
    })
})

test.each([
    [checkUsersSavedAlbums.name, checkUsersSavedAlbums, albumIDs],
    [checkUsersSavedEpisodes.name, checkUsersSavedEpisodes, episodeIds],
    [checkUsersSavedShows.name, checkUsersSavedShows, showIDs],
    [checkUsersSavedTracks.name, checkUsersSavedTracks, trackIds],
])('%s', async (_, request, ids) => {
    const res = await request(token, ids)
    expect(res).toEqual(
        expect.arrayContaining<typeof res[number]>([expect.any(Boolean)])
    )
})
