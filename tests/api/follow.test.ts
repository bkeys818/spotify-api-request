import {
    // followPlaylist,
    // unfollowPlaylist,
    checkIfUsersFollowPlaylist,
    getUsersFollowedArtists,
    // followArtistsOrUsers,
    // unfollowArtistsOrUsers,
    getFollowingStateForArtistsOrUsers,
} from '../../src/api/follow'
import { playlistID } from './playlists.test'
import { userID } from './user-profile.test'
import { artistsUrlRegExp, artistObject, artistIDs } from './artists.test'

// @ts-ignore
const token = global.token

// test(followPlaylist.name, async () => {}

// test(unfollowPlaylist.name, async () => {}

test(checkIfUsersFollowPlaylist.name, async () => {
    const res = await checkIfUsersFollowPlaylist(token, playlistID, [userID])

    expect(res).toEqual(
        expect.arrayContaining<typeof res[number]>([expect.any(Boolean)])
    )
})

test(getUsersFollowedArtists.name, async () => {
    const res = await getUsersFollowedArtists(token, { type: 'artist' })

    const artistsUrlRegExpWithQuery = new RegExp(
        artistsUrlRegExp + '/tracks(\\?.+)?',
        'i'
    )
    expect(res).toMatchObject<typeof res>({
        artists: {
            cursors: {
                after: expect.any(String),
            },
            href: expect.stringMatching(artistsUrlRegExpWithQuery),
            items: expect.arrayContaining<
                typeof res['artists']['items'][number]
            >(res.artists.items.map(artistObject)),
            limit: expect.any(Number),
            next: res.artists.next
                ? expect.stringMatching(artistsUrlRegExpWithQuery)
                : null,
            offset: expect.any(Number),
            previous: res.artists.previous
                ? expect.stringMatching(artistsUrlRegExpWithQuery)
                : null,
            total: expect.any(Number),
        },
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

    expect(res).toEqual(
        expect.arrayContaining<typeof res[number]>([expect.any(Boolean)])
    )
})
