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
import { PagingObject, PlaylistObject } from '../../src/api/objects'
import {
    pagingObject,
    url,
    playlistObject,
    playlistTrackObject,
    imageObject,
} from './objects'
import { userID } from './user-profile.test'

// @ts-ignore
const token = global.token
export const playlistID = '6innvmsboMZC5rdrmY292j'

const playlistPagingObject = (value: PagingObject<PlaylistObject>) =>
    pagingObject<PlaylistObject>({
        value: value,
        url: url(/playlist\/[a-z\d]+\/tracks/, true),
        testObj: playlistObject,
    })

test(getListOfCurrentUsersPlaylists.name, async () => {
    const res = await getListOfCurrentUsersPlaylists(token)

    expect(res).toStrictEqual<typeof res>(playlistPagingObject(res))
})

test(getListOfUsersPlaylists.name, async () => {
    const res = await getListOfUsersPlaylists(token, userID)

    expect(res).toStrictEqual<typeof res>(playlistPagingObject(res))
})

// test(createPlaylist.name, async () => {
//     const res = await createPlaylist(token)
// })

test(getPlaylist.name, async () => {
    const res = await getPlaylist(token, playlistID)

    expect(res).toStrictEqual<typeof res>(playlistObject(res))
})

// test(changePlaylistsDetails.name, async () => {
//     const res = await changePlaylistsDetails(token)
// })

test(getPlaylistsItems.name, async () => {
    const res = await getPlaylistsItems(token, playlistID, { market: 'US' })

    expect(res).toStrictEqual<typeof res>(
        pagingObject<typeof res.items[number]>({
            value: res,
            url: url(/playlist\/[a-z\d]+\/tracks/, true),
            testObj: playlistTrackObject,
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

    expect(res).toStrictEqual<typeof res>(res.map(imageObject))
})

// test(uploadCustomPlaylistCoverImage.name, async () => {
//     const res = await uploadCustomPlaylistCoverImage(token)
// })
