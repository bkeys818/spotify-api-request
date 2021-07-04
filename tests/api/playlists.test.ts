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
    pagingObject,
    playlistObject,
    playlistTrackObject,
    imageObject,
} from './objects'
import { userID } from './user-profile.test'

// @ts-ignore
const token = global.token
export const playlistID = '6innvmsboMZC5rdrmY292j'

test(getListOfCurrentUsersPlaylists.name, async () => {
    const res = await getListOfCurrentUsersPlaylists(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'user’s playlists',
            testObj: playlistObject,
        })
    )
})

test(getListOfUsersPlaylists.name, async () => {
    const res = await getListOfUsersPlaylists(token, userID)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'user’s playlists',
            testObj: playlistObject,
        })
    )
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
        pagingObject({
            value: res,
            endpoint: 'playlist’s tracks',
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
