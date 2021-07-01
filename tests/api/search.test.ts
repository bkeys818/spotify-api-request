import { searchforItem } from '../../src/api/search'
import { PagingObject, TrackObject } from '../../src/api/objects'
import { pagingObject } from './global'
import { tracksUrlRegExp, testTrackObject } from './tracks.test'

// @ts-ignore
const token = global.token

test(searchforItem.name, async () => {
    const res = await searchforItem(token, { q: 'heartbeat', type: 'track' })
    expect(res).toMatchObject<typeof res>(pagingObject<TrackObject>({
        value: res as PagingObject<TrackObject>,
        url: expect.stringMatching(tracksUrlRegExp),
        itemTest: testTrackObject
    }))
})