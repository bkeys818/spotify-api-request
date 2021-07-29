import { getAvailableMarkets } from '../../src/requests/markets'

// @ts-ignore
const token = global.token

describe(getAvailableMarkets, () => {
    test.concurrent('basic request', async () => {
        const res = await getAvailableMarkets(token)

        expect(res).toStrictEqual<typeof res>({
            markets: expect.arrayContaining([
                expect.stringMatching(/[A-Z]{2}/),
            ]),
        })
    })
})
