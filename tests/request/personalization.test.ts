import { getUserTopArtistsandTracks } from '../../src/requests/personalization'
import { pagingObject, trackObject } from '../objects'

// @ts-ignore
const token = global.token

describe(getUserTopArtistsandTracks, () => {
    test.concurrent('basic request', async () => {
        const res = await getUserTopArtistsandTracks(token, 'tracks')

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'my top tracks',
                testObj: trackObject,
            })
        )
    })
})
