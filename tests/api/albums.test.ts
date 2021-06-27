import type { Globals } from '../../jest.config'
import { getMultipleAlbums, getAlbum, getAlbumsTracks } from '../../src/api/albums'
import { SimplifiedAlbumObject, AlbumObject } from '../../src/api/objects'
import {
    testPagingObject,
    testContextObject,
    testExternalIdObject,
    testImageObject
} from './global'
import { testSimplifiedArtistObject } from './artists.test'
import { testSimplifiedTrackObject, testTrackObject } from './tracks.test'

export function testSimplifiedAlbumObject(value: SimplifiedAlbumObject): SimplifiedAlbumObject {
    const expectedObj: SimplifiedAlbumObject = {
        ...testContextObject('album'),
        album_type: expect.stringMatching(/album|single|compilation/),
        artists: expect.any(Array),
        available_markets: expect.any(Array),
        id: expect.any(String),
        images: expect.any(Array),
        name: expect.any(String),
        release_date: expect.stringMatching(/\d{4}(-\d{2}(-\d{2})?)?/),
        release_date_precision: expect.stringMatching(/year|month|day/),
        total_tracks: expect.any(Number),
    }

    if (value.album_group)
        expectedObj.album_group = expect.stringMatching(/album|single|compilation|appears_on/)
    if (value.restrictions)
        expectedObj.restrictions = {
            reason: expect.stringMatching(/market|product|explicit/)
        }

    expect(value).toMatchObject(expectedObj)

    value.artists.forEach(artist => {
        expect(artist).toMatchObject(testSimplifiedArtistObject)
    })
    value.available_markets.forEach(available_market => {
        expect(available_market).toMatch(/[A-Z]{2}/)
    })
    value.images.forEach(image => {
        testImageObject(image)
    })

    return expectedObj
}

export function testAlbumObject(value: AlbumObject): AlbumObject {
    const expectedObj: AlbumObject = {
        ...testSimplifiedAlbumObject(value),
        copyrights: expect.any(Array),
        external_ids: testExternalIdObject(value.external_ids),
        genres: expect.any(Array),
        label: expect.any(String),
        popularity: expect.any(Number),
        tracks: testPagingObject<typeof value['tracks']['items'][number]>({
            value: value.tracks,
            url: expect.stringMatching(
                /https:\/\/api\.spotify\.com\/v1\/albums\/[a-z\d]+\/tracks(\\?.+)?/i
            ),
            itemTest: testSimplifiedTrackObject
        })
    }

    expect(value).toMatchObject(expectedObj)

    value.copyrights.forEach(copyright => {
        expect(copyright).toMatchObject<typeof copyright>({
            text: expect.any(String),
            type: expect.stringMatching(/C|P/)
        })
    })
    value.genres.forEach(genre => {
        expect(genre).toBe(expect.any(String))
    })

    return expectedObj
}

const token = (global as unknown as Globals).testData.token
const albumIDs = ['7gsWAHLeT0w7es6FofOXk1', '13dXX35pYjr8FqRla40K2a']

test(getMultipleAlbums.name, async () => {
    const res = await getMultipleAlbums(token, albumIDs)

    expect(res).toMatchObject<typeof res>({
        albums: expect.any(Array)
    })

    for (const album of res.albums) {
        if (album) expect(album).toMatchObject(testAlbumObject(album))
        else expect(album).toBeNull
    }
})

test(getAlbum.name, async () => {
    const res = await getAlbum(token, albumIDs[0])
    testAlbumObject(res)
})

test(getAlbumsTracks.name, async () => {
    const res = await getAlbumsTracks(token, albumIDs[0])

    expect(res).toMatchObject<typeof res>(testPagingObject<typeof res['items'][number]>({
        value: res,
        url: expect.stringMatching(
            /https:\/\/api\.spotify\.com\/v1\/albums\/[a-z\d]+\/tracks(\\?.+)?/i
        ),
        itemTest: testTrackObject
    }))
})
