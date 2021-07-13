import { searchForItem } from '../../src/api/search'
import { pagingObject, trackObject } from './objects'

// @ts-ignore
const token = global.token

test(searchForItem.name, async () => {
    const res = await searchForItem(token, { q: 'heartbeat', type: 'tracks' })

    expect(res).toStrictEqual<typeof res>({
        tracks: pagingObject({
            value: res.tracks,
            endpoint: 'search',
            testObj: trackObject
        })
    })
})
