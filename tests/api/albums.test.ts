import {
    getMultipleAlbums,
    getAlbum,
    getAlbumsTracks,
} from '../../src/api/albums'
import { albumObject, pagingObject, url, trackObject } from './objects'

// @ts-ignore
const token = global.token
export const albumIDs = ['7gsWAHLeT0w7es6FofOXk1', '13dXX35pYjr8FqRla40K2a']

test(getMultipleAlbums.name, async () => {
    const res = await getMultipleAlbums(token, albumIDs)

    expect(res).toStrictEqual({
        albums: res.albums.map((album) => (album ? albumObject(album) : null)),
    })
})

test(getAlbum.name, async () => {
    const res = await getAlbum(token, albumIDs[0])
    expect(res).toStrictEqual<typeof res>(albumObject(res))
})

test(getAlbumsTracks.name, async () => {
    const res = await getAlbumsTracks(token, albumIDs[0])

    console.log(res)

    expect(res).toEqual<typeof res>(
        pagingObject<typeof res['items'][number]>({
            value: res,
            url: url(/albums\/[a-z\d]+\/tracks/, true),
            testObj: trackObject,
        })
    )
})
