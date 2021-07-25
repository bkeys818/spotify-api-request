import { getUserTopArtistsandTracks } from '../../src/requests/personalization'
import { pagingObject, trackObject } from '../objects'

// @ts-ignore
const token = global.token

test.concurrent(getUserTopArtistsandTracks.name, async () => {
    const res = await getUserTopArtistsandTracks(token, 'tracks')

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'my top tracks',
            testObj: trackObject,
        })
    )
})
