import { searchforItem } from '../../src/api/search'
import { pagingObject, trackObject } from './objects'

// @ts-ignore
const token = global.token

test(searchforItem.name, async () => {
    const res = await searchforItem(token, { q: 'heartbeat', type: 'track' })
    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'search',
            testObj: trackObject
        })
    )
})