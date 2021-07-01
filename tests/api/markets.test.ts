import { getAvailableMarkets } from '../../src/api/markets'

// @ts-ignore
const token = global.token

test(getAvailableMarkets.name, async () => {
    const res = await getAvailableMarkets(token)
    expect(res).toEqual(expect.any(Array))
    res.forEach(market => {
        expect(market).toMatch(/[A-Z]{2}/)
    })
})