import { getUsersTopArtistsandTracks } from '../../src/api/personalization'
import { pagingObject, trackObject } from './objects'

// @ts-ignore
const token = global.token

test(getUsersTopArtistsandTracks.name, async () => {
    const res = await getUsersTopArtistsandTracks(token, 'tracks')

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'tracks',
            testObj: trackObject
        })
    )
})