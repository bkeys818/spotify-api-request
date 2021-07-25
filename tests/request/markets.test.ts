import { getAvailableMarkets } from '../../src/requests/markets'

// @ts-ignore
const token = global.token

test.concurrent(getAvailableMarkets.name, async () => {
    const res = await getAvailableMarkets(token)

    expect(res).toStrictEqual<typeof res>({
        markets: expect.arrayContaining([expect.stringMatching(/[A-Z]{2}/)]),
    })
})
