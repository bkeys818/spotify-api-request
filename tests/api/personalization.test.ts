import type { Globals } from '../../jest.config'
import { getUsersTopArtistsandTracks } from '../../src/api/personalization'
import { PagingObject, TrackObject } from '../../src/api/objects'
import { pagingObject } from './global'
import { testTrackObject } from './tracks.test'

const token = (global as unknown as Globals).testData.token

test(getUsersTopArtistsandTracks.name, async () => {
    const res = await getUsersTopArtistsandTracks(token, 'tracks')
    expect(res).toMatchObject<typeof res>(pagingObject<TrackObject>({
        value: res as PagingObject<TrackObject>,
        url: expect.stringMatching(
            /https:\/\/api\.spotify\.com\/v1\/tracks\/[a-z\d]+/i
        ),
        itemTest: testTrackObject
    }))
})