import type { Globals } from '../../jest.config'
import { getUsersTopArtistsandTracks } from '../../src/api/personalization'
import { PagingObject, TrackObject } from '../../src/api/objects'
import { pagingObject } from './global'
import { tracksUrlRegExp, testTrackObject } from './tracks.test'

const token = (global as unknown as Globals).testData.token

test(getUsersTopArtistsandTracks.name, async () => {
    const res = await getUsersTopArtistsandTracks(token, 'tracks')
    expect(res).toMatchObject<typeof res>(pagingObject<TrackObject>({
        value: res as PagingObject<TrackObject>,
        url: expect.stringMatching(tracksUrlRegExp),
        itemTest: testTrackObject
    }))
})