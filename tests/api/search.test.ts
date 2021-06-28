import type { Globals } from '../../jest.config'
import { searchforItem } from '../../src/api/search'
import { PagingObject, TrackObject } from '../../src/api/objects'
import { pagingObject } from './global'
import { testTrackObject } from './tracks.test'

const token = (global as unknown as Globals).testData.token

test(searchforItem.name, async () => {
    const res = await searchforItem(token, { q: 'heartbeat', type: 'track' })
    expect(res).toMatchObject<typeof res>(pagingObject<TrackObject>({
        value: res as PagingObject<TrackObject>,
        url: expect.stringMatching(
            /https:\/\/api\.spotify\.com\/v1\/tracks\/[a-z\d]+/i
        ),
        itemTest: testTrackObject
    }))
})