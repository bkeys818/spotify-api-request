import { token, categoryIDs, artistIDs, trackIds } from '../global'
import {
    getAllNewReleases,
    getAllFeaturedPlaylists,
    getAllCategories,
    getCategory,
    getCategoryPlaylists,
    getRecommendations,
    getRecommendationGenres,
} from '../../src/requests/browse'
import {
    pagingObject,
    simplifiedAlbumObject,
    simplifiedPlaylistObject,
    // playlistObject,
    categoryObject,
    recommendationsObject,
    arrayOf,
} from '../objects'

describe(getAllNewReleases, () => {
    test.concurrent('basic request', async () => {
        const res = await getAllNewReleases(token)

        expect(res).toStrictEqual<typeof res>({
            albums: pagingObject({
                value: res.albums,
                endpoint: 'new releases',
                testObj: simplifiedAlbumObject,
            }),
        })
    })
})

describe(getAllFeaturedPlaylists, () => {
    test.concurrent('basic request', async () => {
        const res = await getAllFeaturedPlaylists(token)

        expect(res).toStrictEqual<typeof res>({
            message: expect.any(String),
            playlists: pagingObject({
                value: res.playlists,
                endpoint: 'featured playlists',
                testObj: simplifiedPlaylistObject,
            }),
        })
    })
})

describe(getAllCategories, () => {
    test.concurrent('basic request', async () => {
        const res = await getAllCategories(token)

        expect(res).toStrictEqual<typeof res>({
            categories: pagingObject({
                value: res.categories,
                endpoint: 'categories',
                testObj: categoryObject,
            }),
        })
    })
})

describe(getCategory, () => {
    test.concurrent('basic request', async () => {
        const res = await getCategory(token, categoryIDs[0])

        expect(res).toStrictEqual<typeof res>(categoryObject(res))
    })
})

describe(getCategoryPlaylists, () => {
    test.concurrent('basic request', async () => {
        const res = await getCategoryPlaylists(token, categoryIDs[0])

        expect(res).toStrictEqual<typeof res>({
            playlists: pagingObject({
                value: res.playlists,
                endpoint: 'category’s playlists',
                testObj: simplifiedPlaylistObject,
            }),
        })
    })
})

describe(getRecommendations, () => {
    test.concurrent('basic request', async () => {
        const res = await getRecommendations(token, {
            seed_artists: artistIDs[0],
            seed_tracks: trackIds[0],
            seed_genres: categoryIDs[0],
        })

        expect(res).toStrictEqual<typeof res>(recommendationsObject(res))
    })
})

describe(getRecommendationGenres, () => {
    test.concurrent('basic request', async () => {
        const res = await getRecommendationGenres(token)

        expect(res).toStrictEqual<typeof res>({
            genres: arrayOf(res.genres, String),
        })
    })
})