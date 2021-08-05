import { token } from '../global'
import { getAvailableMarkets } from '../../src/requests/markets'

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
