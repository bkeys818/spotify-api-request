import { token } from '../global'
import { searchForItem } from '../../src/requests/search'
import { pagingObject, trackObject } from '../objects'

describe(searchForItem, () => {
    test.concurrent('basic request', async () => {
        const res = await searchForItem(token, {
            q: 'heartbeat',
            type: 'tracks',
        })

        expect(res).toStrictEqual<typeof res>({
            tracks: pagingObject({
                value: res.tracks,
                endpoint: 'search',
                testObj: trackObject,
            }),
        })
    })
})