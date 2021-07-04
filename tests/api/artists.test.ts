import {
    getMultipleArtists,
    getArtist,
    getArtistsTopTracks,
    getArtistsRelatedArtists,
    getArtistsAlbums,
} from '../../src/api/artists'
import {
    artistObject,
    trackObject,
    pagingObject,
    url,
    albumObject,
} from './objects'

// @ts-ignore
const token = global.token
export const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']

test(getMultipleArtists.name, async () => {
    const res = await getMultipleArtists(token, artistIDs)

    expect(res).toStrictEqual<typeof res>({
        artists: res.artists.map((artist) =>
            artist ? artistObject(artist) : null
        ),
    })
})

test(getArtist.name, async () => {
    const res = await getArtist(token, artistIDs[0])

    expect(res).toStrictEqual<typeof res>(artistObject(res))
})

test(getArtistsTopTracks.name, async () => {
    const res = await getArtistsTopTracks(token, artistIDs[0])

    expect(res).toStrictEqual<typeof res>({
        tracks: res.tracks.map(trackObject),
    })
})

test(getArtistsRelatedArtists.name, async () => {
    const res = await getArtistsRelatedArtists(token, artistIDs[0])

    expect(res).toStrictEqual<typeof res>({
        artists: res.artists.map(artistObject),
    })
})

test(getArtistsAlbums.name, async () => {
    const res = await getArtistsAlbums(token, artistIDs[0])

    expect(res).toStrictEqual<typeof res>(
        pagingObject<typeof res.items[number]>({
            value: res,
            url: url(/albums\/[a-z\d]+/, true),
            testObj: albumObject,
        })
    )
})
