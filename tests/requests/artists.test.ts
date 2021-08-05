import { token, artistIDs } from '../global'
import {
    getMultipleArtists,
    getArtist,
    getArtistTopTracks,
    getArtistRelatedArtists,
    getArtistAlbums,
} from '../../src/requests/artists'
import {
    artistObject,
    trackObject,
    pagingObject,
    simplifiedAlbumObject,
} from '../objects'

describe(getMultipleArtists, () => {
    test.concurrent('basic request', async () => {
        const res = await getMultipleArtists(token, artistIDs)

        expect(res).toStrictEqual<typeof res>({
            artists: res.artists.map((artist) =>
                artist ? artistObject(artist) : null
            ),
        })
    })
})

describe(getArtist, () => {
    test.concurrent('basic request', async () => {
        const res = await getArtist(token, artistIDs[0])

        expect(res).toStrictEqual<typeof res>(artistObject(res))
    })
})

describe(getArtistTopTracks, () => {
    test.concurrent('basic request', async () => {
        const res = await getArtistTopTracks(token, artistIDs[0], {
            market: 'US',
        })

        type ExpectedItem = typeof res.tracks[number]
        function customTrackObject(value: ExpectedItem): ExpectedItem {
            const { album, ...otherProps } = value
            const obj: any = trackObject({
                ...otherProps,
                album: {
                    ...album,
                    available_markets: [],
                },
                available_markets: [],
            })
            delete obj.available_markets
            delete obj.album.available_markets
            return obj
        }

        expect(res).toStrictEqual<typeof res>({
            tracks: res.tracks.map(customTrackObject),
        })
    })
})

describe(getArtistRelatedArtists, () => {
    test.concurrent('basic request', async () => {
        const res = await getArtistRelatedArtists(token, artistIDs[0])

        expect(res).toStrictEqual<typeof res>({
            artists: res.artists.map(artistObject),
        })
    })
})

describe(getArtistAlbums, () => {
    test.concurrent('basic request', async () => {
        const res = await getArtistAlbums(token, artistIDs[0])

        expect(res).toStrictEqual<typeof res>(
            pagingObject({
                value: res,
                endpoint: 'artist’s albums',
                testObj: simplifiedAlbumObject,
            })
        )
    })
})
