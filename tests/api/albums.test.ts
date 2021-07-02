import {
    getMultipleAlbums,
    getAlbum,
    getAlbumsTracks,
} from '../../src/api/albums'
import { SimplifiedAlbumObject, AlbumObject } from '../../src/api/objects'
import {
    pagingObject,
    contextObject,
    externalIdObject,
    copyrightObject,
    imageObject,
} from './global'
import { simplifiedArtistObject } from './artists.test'
import { simplifiedTrackObject, trackObject } from './tracks.test'

export const albumsUrlRegExp =
    /https:\/\/api\.spotify\.com\/v1\/albums\/[a-z\d]+/

export function simplifiedAlbumObject(
    value: SimplifiedAlbumObject
): SimplifiedAlbumObject {
    const expectedObj: SimplifiedAlbumObject = {
        ...contextObject('album'),
        album_type: expect.stringMatching(/album|single|compilation/),
        artists: expect.arrayContaining<typeof value.artists[number]>([
            simplifiedArtistObject,
        ]),
        available_markets: expect.arrayContaining<
            typeof value.available_markets[number]
        >([expect.any(String)]),
        id: expect.any(String),
        images: expect.arrayContaining<typeof value.images[number]>(
            value.images.map(imageObject)
        ),
        name: expect.any(String),
        release_date: expect.stringMatching(/\d{4}(-\d{2}(-\d{2})?)?/),
        release_date_precision: expect.stringMatching(/year|month|day/),
        total_tracks: expect.any(Number),
    }

    if (value.album_group)
        expectedObj.album_group = expect.stringMatching(
            /album|single|compilation|appears_on/
        )
    if (value.restrictions)
        expectedObj.restrictions = {
            reason: expect.stringMatching(/market|product|explicit/),
        }

    return expectedObj
}

export function albumObject(value: AlbumObject): AlbumObject {
    return {
        ...simplifiedAlbumObject(value),
        copyrights: expect.arrayContaining<typeof value.copyrights[number]>([
            copyrightObject,
        ]),
        external_ids: externalIdObject(value.external_ids),
        genres: expect.arrayContaining([expect.any(String)]),
        label: expect.any(String),
        popularity: expect.any(Number),
        tracks: pagingObject<typeof value.tracks.items[number]>({
            value: value.tracks,
            url: expect.stringMatching(
                new RegExp(albumsUrlRegExp.source + '/tracks(\\?.+)?', 'i')
            ),
            itemTest: simplifiedTrackObject,
        }),
    }
}

// @ts-ignore
const token = global.token
export const albumIDs = ['7gsWAHLeT0w7es6FofOXk1', '13dXX35pYjr8FqRla40K2a']

test(getMultipleAlbums.name, async () => {
    const res = await getMultipleAlbums(token, albumIDs)

    expect(res).toMatchObject<typeof res>({
        albums: expect.arrayContaining<typeof res.albums[number]>(
            res.albums.map((album) => (album ? albumObject(album) : null))
        ),
    })
})

test(getAlbum.name, async () => {
    const res = await getAlbum(token, albumIDs[0])
    expect(res).toMatchObject<typeof res>(albumObject(res))
})

test(getAlbumsTracks.name, async () => {
    const res = await getAlbumsTracks(token, albumIDs[0])

    expect(res).toMatchObject<typeof res>(
        pagingObject<typeof res.items[number]>({
            value: res,
            url: expect.stringMatching(
                new RegExp(albumsUrlRegExp.source + '/tracks(\\?.+)?', 'i')
            ),
            itemTest: trackObject,
        })
    )
})
