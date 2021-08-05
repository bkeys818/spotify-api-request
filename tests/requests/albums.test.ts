import { token, albumIDs } from '../global'
import {
    getMultipleAlbums,
    getAlbum,
    getAlbumTracks,
} from '../../src/requests/albums'
import { albumObject, pagingObject, simplifiedTrackObject } from '../objects'

describe(getMultipleAlbums, () => {
    test.concurrent('basic request', async () => {
        const res = await getMultipleAlbums(token, albumIDs)

        expect(res).toStrictEqual({
            albums: res.albums.map((album) =>
                album ? albumObject(album) : null
            ),
        })
    })
})

describe(getAlbum, () => {
    test.concurrent('basic request', async () => {
        const res = await getAlbum(token, albumIDs[0])

        expect(res).toStrictEqual<typeof res>(albumObject(res))
    })
})

describe(getAlbumTracks, () => {
    test.concurrent('basic request', async () => {
        const res = await getAlbumTracks(token, albumIDs[0])

        expect(res).toEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'album’s tracks',
                testObj: simplifiedTrackObject,
            })
        )
    })
})
