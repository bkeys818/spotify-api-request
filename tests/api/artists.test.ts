import {
    getMultipleArtists,
    getArtist,
    getArtistTopTracks,
    getArtistRelatedArtists,
    getArtistAlbums,
} from '../../src/api/artists'
import {
    artistObject,
    trackObject,
    pagingObject,
    simplifiedAlbumObject,
} from './objects'

// @ts-ignore
const token = global.token
const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']

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

test(getArtistTopTracks.name, async () => {
    const res = await getArtistTopTracks(token, artistIDs[0], {
        market: 'US'
    })

    type ExpectedItem = typeof res.tracks[number]
    function customTrackObject(value: ExpectedItem): ExpectedItem {
        const { album, ...otherProps } = value
        const obj: any = trackObject({
            ...otherProps,
            album: {
                ...album,
                available_markets: []
            },
            available_markets: []
        })
        delete obj.available_markets
        delete obj.album.available_markets
        return obj
    }

    expect(res).toStrictEqual<typeof res>({
        tracks: res.tracks.map(customTrackObject),
    })
})

test(getArtistRelatedArtists.name, async () => {
    const res = await getArtistRelatedArtists(token, artistIDs[0])

    expect(res).toStrictEqual<typeof res>({
        artists: res.artists.map(artistObject),
    })
})

test(getArtistAlbums.name, async () => {
    const res = await getArtistAlbums(token, artistIDs[0])

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'artist’s albums',
            testObj: simplifiedAlbumObject,
        })
    )
})
