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
import {
    SimplifiedPlaylistObject,
    PlaylistObject,
    PlaylistTrackObject,
    PagingObject,
} from '../../src/api/objects'
import {
    contextObject,
    followerObject,
    pagingObject,
    imageObject,
} from './global'
import { trackObject } from './tracks.test'
import { publicUserObject, userID } from './user-profile.test'

export const playlistsUrlRegExp =
    /https:\/\/api\.spotify\.com\/v1\/playlists\/[a-z\d]+/
const playlistsTracksUrlRegExp = new RegExp(
    playlistsUrlRegExp + '/tracks(\\?.+)?',
    'i'
)

/** @internal */
function _simplifiedPlaylistObject(
    value: Omit<SimplifiedPlaylistObject, 'tracks'>
): Omit<SimplifiedPlaylistObject, 'tracks'> {
    return {
        ...contextObject('playlist'),
        collaborative: expect.any(Boolean),
        description: value.description ? expect.any(String) : null,
        id: expect.any(String),
        images: expect.arrayContaining<typeof value['images'][number]>(
            value.images.map(imageObject)
        ),
        name: expect.any(String),
        owner: publicUserObject(value.owner),
        public: expect.any(Boolean),
        snapshot_id: expect.any(String),
    }
}

export function simplifiedPlaylistObject(
    value: SimplifiedPlaylistObject
): SimplifiedPlaylistObject {
    return {
        ..._simplifiedPlaylistObject(value),
        tracks: {
            href: expect.stringMatching(playlistsTracksUrlRegExp),
            total: expect.any(Number),
        },
    }
}

export function playlistObject(value: PlaylistObject): PlaylistObject {
    return {
        ..._simplifiedPlaylistObject(value),
        followers: followerObject,
        tracks: pagingObject<PlaylistTrackObject>({
            value: value.tracks,
            url: expect.stringMatching(playlistsTracksUrlRegExp),
            itemTest: playlistTrackObject,
        }),
    }
}

function playlistTrackObject(value: PlaylistTrackObject): PlaylistTrackObject {
    return {
        added_at: value.added_at ? expect.any(String) : null,
        added_by: value.added_by ? publicUserObject(value.added_by) : null,
        is_local: expect.any(Boolean),
        track: trackObject(value.track),
        primary_color: null,
        video_thumbnail: {
            url: null,
        },
    }
}

// @ts-ignore
const token = global.token
export const playlistID = '6innvmsboMZC5rdrmY292j'
const playlistPagingObject = (
    value: PagingObject<PlaylistObject>
): PagingObject<PlaylistObject> =>
    pagingObject<PlaylistObject>({
        value: value,
        url: expect.stringMatching(playlistsUrlRegExp),
        itemTest: playlistObject,
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

    expect(res).toMatchObject<typeof res>(playlistObject(res))
})

// test(changePlaylistsDetails.name, async () => {
//     const res = await changePlaylistsDetails(token)
// })

test(getPlaylistsItems.name, async () => {
    const res = await getPlaylistsItems(token, playlistID, { market: 'US' })

    expect(res).toMatchObject<typeof res>(
        pagingObject<PlaylistTrackObject>({
            value: res,
            url: expect.stringMatching(playlistsTracksUrlRegExp),
            itemTest: playlistTrackObject,
        })
    )
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

    expect.arrayContaining<typeof res[number]>(res.map(imageObject))
})

// test(uploadCustomPlaylistCoverImage.name, async () => {
//     const res = await uploadCustomPlaylistCoverImage(token)
// })
