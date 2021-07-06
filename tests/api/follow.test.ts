import {
    // followPlaylist,
    // unfollowPlaylist,
    checkIfUsersFollowPlaylist,
    getUserFollowedArtists,
    // followArtistsOrUsers,
    // unfollowArtistsOrUsers,
    getFollowingStateForArtistsOrUsers,
} from '../../src/api/follow'
import { arrayOf, cursorPagingObject, artistObject } from './objects'
import { playlistID } from './playlists.test'
import { userID } from './user-profile.test'
import { artistIDs } from './artists.test'

// @ts-ignore
const token = global.token

// test(followPlaylist.name, async () => {}

// test(unfollowPlaylist.name, async () => {}

test(checkIfUsersFollowPlaylist.name, async () => {
    const res = await checkIfUsersFollowPlaylist(token, playlistID, [userID])

    expect(res).toStrictEqual(arrayOf(res, Boolean))
})

test(getUserFollowedArtists.name, async () => {
    const res = await getUserFollowedArtists(token, { type: 'artist' })

    expect(res).toStrictEqual<typeof res>({
        artists: cursorPagingObject({
            value: res.artists,
            endpoint: 'artists',
            testObj: artistObject
        })
    })
})

// test(followArtistsOrUsers.name, async () => {}

// test(unfollowArtistsOrUsers.name, async () => {}

test(getFollowingStateForArtistsOrUsers.name, async () => {
    const res = await getFollowingStateForArtistsOrUsers(
        token,
        'artist',
        artistIDs
    )

    expect(res).toStrictEqual(arrayOf(res, Boolean))
})
