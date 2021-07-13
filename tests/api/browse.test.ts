import {
    getAllNewReleases,
    getAllFeaturedPlaylists,
    getAllCategories,
    getCategory,
    getCategoryPlaylists,
    getRecommendations,
    getRecommendationGenres,
} from '../../src/api/browse'
import {
    pagingObject,
    simplifiedAlbumObject,
    simplifiedPlaylistObject,
    // playlistObject,
    categoryObject,
    recommendationsObject,
    arrayOf
} from './objects'

// @ts-ignore
const token = global.token
const categoryID = 'party'
const artistIDs = ['3Gm5F95VdRxW3mqCn8RPBJ', '2QsynagSdAqZj3U9HgDzjD']
const trackIds = ['3WWAvWDBQANpJeNbvVbjMg', '0TXK1dsiK9lkeaK6neSP2j']

test(getAllNewReleases.name, async () => {
    const res = await getAllNewReleases(token)

    expect(res).toStrictEqual<typeof res>({
        albums: pagingObject({
            value: res.albums,
            endpoint: 'new releases',
            testObj: simplifiedAlbumObject,
        }),
    })
})

test(getAllFeaturedPlaylists.name, async () => {
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

test(getAllCategories.name, async () => {
    const res = await getAllCategories(token)

    expect(res).toStrictEqual<typeof res>({
        categories: pagingObject({
            value: res.categories,
            endpoint: 'categories',
            testObj: categoryObject,
        }),
    })
})

test(getCategory.name, async () => {
    const res = await getCategory(token, categoryID)

    expect(res).toStrictEqual<typeof res>(categoryObject(res))
})

test(getCategoryPlaylists.name, async () => {
    const res = await getCategoryPlaylists(token, categoryID)

    expect(res).toStrictEqual<typeof res>({
        playlists: pagingObject({
            value: res.playlists,
            endpoint: 'category’s playlists',
            testObj: simplifiedPlaylistObject,
        })
    })
})

test(getRecommendations.name, async () => {
    const res = await getRecommendations(token, {
        seed_artists: artistIDs[0],
        seed_tracks: trackIds[0],
        seed_genres: categoryID,
    })

    expect(res).toStrictEqual<typeof res>(recommendationsObject(res))
})

test(getRecommendationGenres.name, async () => {
    const res = await getRecommendationGenres(token)

    expect(res).toStrictEqual<typeof res>({
        genres: arrayOf(res.genres, String)
    })
})
