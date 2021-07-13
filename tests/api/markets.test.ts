import { getAvailableMarkets } from '../../src/api/markets'

// @ts-ignore
const token = global.token

test(getAvailableMarkets.name, async () => {
    const res = await getAvailableMarkets(token)

    expect(res).toStrictEqual<typeof res>({
        markets: expect.arrayContaining([expect.stringMatching(/[A-Z]{2}/)]),
    })
})
