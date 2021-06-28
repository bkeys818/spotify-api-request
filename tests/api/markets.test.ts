import type { Globals } from '../../jest.config'
import { getAvailableMarkets } from '../../src/api/markets'

const token = (global as unknown as Globals).testData.token

test(getAvailableMarkets.name, async () => {
    const res = await getAvailableMarkets(token)
    expect(res).toEqual(expect.any(Array))
    res.forEach(market => {
        expect(market).toMatch(/[A-Z]{2}/)
    })
})