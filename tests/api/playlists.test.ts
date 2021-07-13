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
    simplifiedPlaylistObject,
    playlistObject,
    playlistTrackObject,
    imageObject,
} from './objects'

// @ts-ignore
const token = global.token
const playlistID = '6innvmsboMZC5rdrmY292j'
const userID = 'spotify'

test(getListOfCurrentUserPlaylists.name, async () => {
    const res = await getListOfCurrentUserPlaylists(token)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'user’s playlists',
            testObj: simplifiedPlaylistObject,
        })
    )
})

test(getListOfUserPlaylists.name, async () => {
    const res = await getListOfUserPlaylists(token, userID)

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'user’s playlists',
            testObj: simplifiedPlaylistObject,
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

    type ExpectedItem = typeof res.items[number]
    function customPlaylistTrackObjectObject(value: ExpectedItem): ExpectedItem {
        const { track, ...otherProps } = value
        const { album, ...otherTrackProps } = track
        const obj: any = playlistTrackObject({
            ...otherProps,
            track: {
                ...otherTrackProps,
                available_markets: [],
                album: {
                    ...album,
                    available_markets: []
                }
            }
        })
        delete obj.track.available_markets
        delete obj.track.album.available_markets
        return obj
    }

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'playlist’s tracks',
            testObj: customPlaylistTrackObjectObject,
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
