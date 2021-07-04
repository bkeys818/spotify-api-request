import { searchforItem } from '../../src/api/search'
import { pagingObject, url, trackObject } from './objects'

// @ts-ignore
const token = global.token

test(searchforItem.name, async () => {
    const res = await searchforItem(token, { q: 'heartbeat', type: 'track' })
    expect(res).toStrictEqual<typeof res>(
        pagingObject<typeof res.items[number]>({
            value: res,
            url: url(/tracks\/[a-z\d]+/, true),
            // @ts-ignore
            testObj: trackObject
        })
    )
})