import type { Globals } from '../../jest.config'
import {
    SimplifiedArtistObject,
    ArtistObject,
    AlbumObject
} from '../../src/api/objects'
import {
    getMultipleArtists,
    getArtist,
    getArtistsTopTracks,
    getArtistsRelatedArtists,
    getArtistsAlbums,
} from '../../src/api/artists'
import { pagingObject, contextObject, testImageObject } from './global'
import { testAlbumObject } from './albums.test'
import { testTrackObject } from './tracks.test'

export const artistsUrlRegExp = /https:\/\/api\.spotify\.com\/v1\/artists\/[a-z\d]+/i

export const testSimplifiedArtistObject: SimplifiedArtistObject = {
    ...contextObject('artist'),
    id: expect.any(String),
    name: expect.any(String),
}

export function testArtistObject(value: ArtistObject): ArtistObject {
    const expectedObj: ArtistObject = {
        ...testSimplifiedArtistObject,
        followers: {
            href: null,
            total: expect.any(Number),
        },
        genres: expect.any(Array),
        images: expect.any(Array),
        popularity: expect.any(Number),
    }
    value.genres.forEach((genre) => {
        expect(genre).toStrictEqual(expect.any(String))
    })
    value.images.forEach(testImageObject)
    return expectedObj
}

const token = (global as unknown as Globals).testData.token
const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']

test(getMultipleArtists.name, async () => {
    const res = await getMultipleArtists(token, artistIDs)

    expect(res).toMatchObject<typeof res>({
        artists: expect.any(Array),
    })

    res.artists.forEach((artist) => {
        if (artist) expect(artist).toMatchObject(testArtistObject(artist))
        else expect(artist).toBeNull
    })
})

test(getArtist.name, async () => {
    const res = await getArtist(token, artistIDs[0])
    testArtistObject(res)
})

test(getArtistsTopTracks.name, async () => {
    const res = await getArtistsTopTracks(token, artistIDs[0])

    expect(res).toMatchObject<typeof res>({
        tracks: expect.any(Array),
    })

    res.tracks.forEach(testTrackObject)
})

test(getArtistsRelatedArtists.name, async () => {
    const res = await getArtistsRelatedArtists(token, artistIDs[0])

    expect(res).toMatchObject<typeof res>({
        artists: expect.any(Array),
    })

    res.artists.forEach(testArtistObject)
})

test(getArtistsAlbums.name, async () => {
    let res = await getArtistsAlbums(token, artistIDs[0])

    pagingObject<AlbumObject>({
        // @ts-ignore
        value: res,
        url: expect.stringMatching(
            new RegExp(artistsUrlRegExp.source + '\/albums(\\?.+)?', 'i')
        ),
        itemTest: testAlbumObject
    })
})
