import {
    getListOfCurrentUserPlaylists,
    getListOfUserPlaylists,
    // createPlaylist,
    getPlaylist,
    // changePlaylistsDetails,
    getPlaylistItems,
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

test(getListOfCurrentUserPlaylists.name, async () => {
    const res = await getListOfCurrentUserPlaylists(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'user’s playlists',
            testObj: playlistObject,
        })
    )
})

test(getListOfUserPlaylists.name, async () => {
    const res = await getListOfUserPlaylists(token, userID)

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

test(getPlaylistItems.name, async () => {
    const res = await getPlaylistItems(token, playlistID, { market: 'US' })

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
