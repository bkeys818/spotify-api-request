import {
    // followPlaylist,
    // unfollowPlaylist,
    checkIfUsersFollowPlaylist,
    getUserFollowedArtists,
    // followArtistsOrUsers,
    // unfollowArtistsOrUsers,
    getFollowingStateForArtistsOrUsers,
} from '../../src/requests/follow'
import { arrayOf, cursorPagingObject, artistObject } from '../objects'

// @ts-ignore
const token = global.token
const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']
const playlistID = '6innvmsboMZC5rdrmY292j'
const userID = 'spotify'

// test.concurrent(followPlaylist.name, async () => {}

// test.concurrent(unfollowPlaylist.name, async () => {}

test.concurrent(checkIfUsersFollowPlaylist.name, async () => {
    const res = await checkIfUsersFollowPlaylist(token, playlistID, [userID])

    expect(res).toStrictEqual(arrayOf(res, Boolean))
})

test.concurrent(getUserFollowedArtists.name, async () => {
    const res = await getUserFollowedArtists(token, { type: 'artist' })

    expect(res).toStrictEqual<typeof res>({
        artists: cursorPagingObject({
            value: res.artists,
            endpoint: 'my following',
            testObj: artistObject,
        }),
    })
})

// test.concurrent(followArtistsOrUsers.name, async () => {}

// test.concurrent(unfollowArtistsOrUsers.name, async () => {}

test.concurrent(getFollowingStateForArtistsOrUsers.name, async () => {
    const res = await getFollowingStateForArtistsOrUsers(
        token,
        'artist',
        artistIDs
    )

    expect(res).toStrictEqual(arrayOf(res, Boolean))
})
