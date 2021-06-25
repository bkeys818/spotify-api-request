import type { Globals } from '../../jest.config'
import { getMultipleAlbums, getAlbum, getAlbumsTracks } from '../../src/api/albums'
import { SimplifiedAlbumObject, AlbumObject } from '../../src/api/objects'
import {
    UnwrapPromise,
    pagingObject,
    contextObject,
    externalIdObject,
    imageObject
} from './global'
import { testSimplifiedArtistObject } from './artists.test'
import { testSimplifiedTrackObject, testTrackObject } from './tracks.test'

const token = (global as unknown as Globals).testData.token
const albumIDs = ['7gsWAHLeT0w7es6FofOXk1']


export function testSimplifiedAlbumObject(value: SimplifiedAlbumObject): SimplifiedAlbumObject {
    const expectedObj: SimplifiedAlbumObject = {
        ...contextObject('album'),
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
        imageObject(image)
    })

    return expectedObj
}

export function testAlbumObject(value: AlbumObject): AlbumObject {
    const expectedObj: AlbumObject = {
        ...testSimplifiedAlbumObject(value),
        copyrights: expect.any(Array),
        external_ids: externalIdObject(value.external_ids),
        genres: expect.any(Array),
        label: expect.any(String),
        popularity: expect.any(Number),
        tracks: pagingObject<typeof value['tracks']['items'][number]>({
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

test(getMultipleAlbums.name, async () => {
    const res = await getMultipleAlbums(token, albumIDs)

    type ExpectedObj = UnwrapPromise<ReturnType<typeof getMultipleAlbums>>

    expect(res).toMatchObject<ExpectedObj>({
        albums: expect.any(Array)
    })

    for (const album of res.albums) {
        if (album) expect(album).toMatchObject(testAlbumObject(album))
        else expect(album).toBeNull
    }
})

test(getAlbum.name, async () => {
    testAlbumObject(await getAlbum(token, albumIDs[0]))
})

test(getAlbumsTracks.name, async () => {
    const res = await getAlbumsTracks(token, albumIDs[0])

    type ExpectedObj = UnwrapPromise<ReturnType<typeof getAlbumsTracks>>

    expect(res).toMatchObject<ExpectedObj>(pagingObject<ExpectedObj['items'][number]>({
        value: res,
        url: expect.stringMatching(
            /https:\/\/api\.spotify\.com\/v1\/albums\/[a-z\d]+\/tracks(\\?.+)?/i
        ),
        itemTest: testTrackObject
    }))
})