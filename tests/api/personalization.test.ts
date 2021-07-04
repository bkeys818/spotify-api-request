import { getUsersTopArtistsandTracks } from '../../src/api/personalization'
import { PagingObject, TrackObject } from '../../src/api/objects'
import { pagingObject, url, trackObject } from './objects'

// @ts-ignore
const token = global.token

test(getUsersTopArtistsandTracks.name, async () => {
    const res = await getUsersTopArtistsandTracks(token, 'tracks')
    expect(res).toStrictEqual<typeof res>(
        pagingObject<TrackObject>({
        value: res as PagingObject<TrackObject>,
        url: url(/tracks\/[a-z\d]+/, true),
        testObj: trackObject
    }))
})