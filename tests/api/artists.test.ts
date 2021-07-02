import {
    SimplifiedArtistObject,
    ArtistObject,
    AlbumObject,
} from '../../src/api/objects'
import {
    getMultipleArtists,
    getArtist,
    getArtistsTopTracks,
    getArtistsRelatedArtists,
    getArtistsAlbums,
} from '../../src/api/artists'
import { pagingObject, contextObject, imageObject } from './global'
import { albumObject } from './albums.test'
import { trackObject } from './tracks.test'

export const artistsUrlRegExp =
    /https:\/\/api\.spotify\.com\/v1\/artists\/[a-z\d]+/i

export const simplifiedArtistObject: SimplifiedArtistObject = {
    ...contextObject('artist'),
    id: expect.any(String),
    name: expect.any(String),
}

export function artistObject(value: ArtistObject): ArtistObject {
    return {
        ...simplifiedArtistObject,
        followers: {
            href: null,
            total: expect.any(Number),
        },
        genres: expect.arrayContaining([expect.any(String)]),
        images: expect.arrayContaining<typeof value.images[number]>(
            value.images.map(imageObject)
        ),
        popularity: expect.any(Number),
    }
}

// @ts-ignore
const token = global.token
export const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']

test(getMultipleArtists.name, async () => {
    const res = await getMultipleArtists(token, artistIDs)

    expect(res).toMatchObject<typeof res>({
        artists: expect.arrayContaining<typeof res.artists[number]>(
            res.artists.map((artist) => (artist ? artistObject(artist) : null))
        ),
    })
})

test(getArtist.name, async () => {
    const res = await getArtist(token, artistIDs[0])
    expect(res).toMatchObject<typeof res>(artistObject(res))
})

test(getArtistsTopTracks.name, async () => {
    const res = await getArtistsTopTracks(token, artistIDs[0])

    expect(res).toMatchObject<typeof res>({
        tracks: expect.arrayContaining<typeof res.tracks[number]>(
            res.tracks.map(trackObject)
        ),
    })
})

test(getArtistsRelatedArtists.name, async () => {
    const res = await getArtistsRelatedArtists(token, artistIDs[0])

    expect(res).toMatchObject<typeof res>({
        artists: expect.arrayContaining<typeof res.artists[number]>(
            res.artists.map(artistObject)
        ),
    })
})

test(getArtistsAlbums.name, async () => {
    let res = await getArtistsAlbums(token, artistIDs[0])

    expect(res).toMatchObject<typeof res>(
        pagingObject<AlbumObject>({
            // @ts-ignore
            value: res,
            url: expect.stringMatching(
                new RegExp(artistsUrlRegExp.source + '/albums(\\?.+)?', 'i')
            ),
            itemTest: albumObject,
        })
    )
})
