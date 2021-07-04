import {
    // followPlaylist,
    // unfollowPlaylist,
    checkIfUsersFollowPlaylist,
    getUsersFollowedArtists,
    // followArtistsOrUsers,
    // unfollowArtistsOrUsers,
    getFollowingStateForArtistsOrUsers,
} from '../../src/api/follow'
import { arrayOf, cursorPagingObject, url, artistObject } from './objects'
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

test(getUsersFollowedArtists.name, async () => {
    const res = await getUsersFollowedArtists(token, { type: 'artist' })

    expect(res).toStrictEqual<typeof res>({
        artists: cursorPagingObject<typeof res.artists.items[number]>({
            value: res.artists,
            url: url(/artists\/[a-z\d]+/, true),
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
