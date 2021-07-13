import { getUserTopArtistsandTracks } from '../../src/api/personalization'
import { pagingObject, trackObject } from './objects'

// @ts-ignore
const token = global.token

test(getUserTopArtistsandTracks.name, async () => {
    const res = await getUserTopArtistsandTracks(token, 'tracks')

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'my top tracks',
            testObj: trackObject,
        })
    )
})
