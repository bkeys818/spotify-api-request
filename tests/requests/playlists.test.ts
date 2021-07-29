import { token, playlistIDs, userIDs } from '../global'
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
} from '../../src/requests/playlists'
import {
    pagingObject,
    simplifiedPlaylistObject,
    playlistObject,
    playlistTrackObject,
    imageObject,
} from '../objects'

describe(getListOfCurrentUserPlaylists, () => {
    test.concurrent('basic request', async () => {
        const res = await getListOfCurrentUserPlaylists(token)

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'user’s playlists',
                testObj: simplifiedPlaylistObject,
            })
        )
    })
})

describe(getListOfUserPlaylists, () => {
    test.concurrent('basic request', async () => {
        const res = await getListOfUserPlaylists(token, userIDs[0])

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'user’s playlists',
                testObj: simplifiedPlaylistObject,
            })
        )
    })
})

// test.concurrent(createPlaylist.name, async () => {
//     const res = await createPlaylist(token)
// })

describe(getPlaylist, () => {
    test.concurrent('basic request', async () => {
        const res = await getPlaylist(token, playlistIDs[0])

        expect(res).toStrictEqual<typeof res>(playlistObject(res))
    })
})

// test.concurrent(changePlaylistsDetails.name, async () => {
//     const res = await changePlaylistsDetails(token)
// })

describe(getPlaylistItems, () => {
    test.concurrent('basic request', async () => {
        const res = await getPlaylistItems(token, playlistIDs[0], { market: 'US' })

        type ExpectedItem = typeof res.items[number]
        function customPlaylistTrackObjectObject(
            value: ExpectedItem
        ): ExpectedItem {
            const { track, ...otherProps } = value
            const { album, ...otherTrackProps } = track
            const obj: any = playlistTrackObject({
                ...otherProps,
                track: {
                    ...otherTrackProps,
                    available_markets: [],
                    album: {
                        ...album,
                        available_markets: [],
                    },
                },
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
})

// test.concurrent(addItemsToPlaylist.name, async () => {
//     const res = await addItemsToPlaylist(token)
// })

// test.concurrent(reorderOReplacePlaylistsItems.name, async () => {
//     const res = await reorderOReplacePlaylistsItems(token)
// })

// test.concurrent(removeItemsFromPlaylist.name, async () => {
//     const res = await removeItemsFromPlaylist(token)
// })

describe(getPlaylistCoverImage, () => {
    test.concurrent('basic request', async () => {
        const res = await getPlaylistCoverImage(token, playlistIDs[0])

        expect(res).toStrictEqual<typeof res>(res.map(imageObject))
    })
})

// test.concurrent(uploadCustomPlaylistCoverImage.name, async () => {
//     const res = await uploadCustomPlaylistCoverImage(token)
// })
