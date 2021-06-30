import type { Globals } from '../../jest.config'
import {
    getListOfCurrentUsersPlaylists,
    getListOfUsersPlaylists,
    // createPlaylist,
    getPlaylist,
    // changePlaylistsDetails,
    getPlaylistsItems,
    // addItemsToPlaylist,
    // reorderOReplacePlaylistsItems,
    // removeItemsFromPlaylist,
    getPlaylistCoverImage,
    // uploadCustomPlaylistCoverImage,
} from '../../src/api/playlists'
import { SimplifiedPlaylistObject, PlaylistObject, PlaylistTrackObject, PagingObject } from '../../src/api/objects'
import { contextObject, followerObject, pagingObject, testImageObject } from './global'
import { testTrackObject } from './tracks.test'
import { testPublicUserObject, userID } from './user-profile.test'

export const playlistsUrlRegExp = /https:\/\/api\.spotify\.com\/v1\/playlists\/[a-z\d]+/
const playlistsTracksUrlRegExp = new RegExp(playlistsUrlRegExp + '\/tracks(\\?.+)?', 'i')

/** @internal */
function _testSimplifiedPlaylistObject(value: Omit<SimplifiedPlaylistObject, 'tracks'>): Omit<SimplifiedPlaylistObject, 'tracks'> {
    const expectedObj: Omit<SimplifiedPlaylistObject, 'tracks'> = {
        ...contextObject('playlist'),
        collaborative: expect.any(Boolean),
        description: value.description ? expect.any(String) : null,
        id: expect.any(String),
        images: expect.any(Array),
        name: expect.any(String),
        owner: testPublicUserObject(value.owner),
        public: expect.any(Boolean),
        snapshot_id: expect.any(String),
    }

    value.images.forEach(testImageObject)

    expect(value).toMatchObject(expectedObj)

    return expectedObj
}

export function testSimplifiedPlaylistObject(value: SimplifiedPlaylistObject): SimplifiedPlaylistObject {
    const expectedObj: SimplifiedPlaylistObject = {
        ..._testSimplifiedPlaylistObject(value),
        tracks: {
            href: expect.stringMatching(playlistsTracksUrlRegExp),
            total: expect.any(Number)
        },
    }
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

export function testPlaylistObject(value: PlaylistObject): PlaylistObject {
    const expectedObj: PlaylistObject = {
        ..._testSimplifiedPlaylistObject(value),
        followers: followerObject,
        tracks: pagingObject<PlaylistTrackObject>({
            value: value.tracks,
            url: expect.stringMatching(playlistsTracksUrlRegExp),
            itemTest: testPlaylistTrackObject
        })
    }
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

function testPlaylistTrackObject(value: PlaylistTrackObject): PlaylistTrackObject {
    const expectedObj: PlaylistTrackObject = {
        added_at: value.added_at ? expect.any(String) : null,
        added_by: value.added_by ? testPublicUserObject(value.added_by) : null,
        is_local: expect.any(Boolean),
        track: testTrackObject(value.track),
        primary_color: null,
        video_thumbnail: {
            url: null
        },
    }
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

const token = (global as unknown as Globals).testData.token
const playlistID = '6innvmsboMZC5rdrmY292j'

const playlistPagingObject = (
    value: PagingObject<PlaylistObject>
): PagingObject<PlaylistObject> => pagingObject<PlaylistObject>({
    value: value,
    url: expect.stringMatching(playlistsUrlRegExp),
    itemTest: testPlaylistObject
})

test(getListOfCurrentUsersPlaylists.name, async () => {
    const res = await getListOfCurrentUsersPlaylists(token)

    expect(res).toMatchObject<typeof res>(playlistPagingObject(res))
})

test(getListOfUsersPlaylists.name, async () => {
    const res = await getListOfUsersPlaylists(token, userID)

    expect(res).toMatchObject<typeof res>(playlistPagingObject(res))
})

// test(createPlaylist.name, async () => {
//     const res = await createPlaylist(token)
// })

test(getPlaylist.name, async () => {
    const res = await getPlaylist(token, playlistID)

    testPlaylistObject(res)
})

// test(changePlaylistsDetails.name, async () => {
//     const res = await changePlaylistsDetails(token)
// })

test(getPlaylistsItems.name, async () => {
    const res = await getPlaylistsItems(token, playlistID, { market: 'US' })

    expect(res).toMatchObject<typeof res>(pagingObject<PlaylistTrackObject>({
        value: res,
        url: expect.stringMatching(playlistsTracksUrlRegExp),
        itemTest: testPlaylistTrackObject
    }))
})

// test(addItemsToPlaylist.name, async () => {
//     const res = await addItemsToPlaylist(token)
// })

// test(reorderOReplacePlaylistsItems.name, async () => {
//     const res = await reorderOReplacePlaylistsItems(token)
// })

// test(removeItemsFromPlaylist.name, async () => {
//     const res = await removeItemsFromPlaylist(token)
// })

test(getPlaylistCoverImage.name, async () => {
    const res = await getPlaylistCoverImage(token, playlistID)

    res.forEach(testImageObject)
})

// test(uploadCustomPlaylistCoverImage.name, async () => {
//     const res = await uploadCustomPlaylistCoverImage(token)
// })