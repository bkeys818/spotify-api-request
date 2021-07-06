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
    albumObject,
    playlistObject,
    categoryObject,
    recommendationsObject,
} from './objects'
import { artistIDs } from './artists.test'
import { trackIds } from './tracks.test'

// @ts-ignore
const token = global.token
const categoryID = 'party'

test(getAllNewReleases.name, async () => {
    const res = await getAllNewReleases(token)

    expect(res).toStrictEqual<typeof res>({
        message: expect.any(String),
        albums: pagingObject({
            value: res.albums,
            endpoint: 'albums',
            testObj: albumObject,
        }),
    })
})

test(getAllFeaturedPlaylists.name, async () => {
    const res = await getAllFeaturedPlaylists(token)

    expect(res).toStrictEqual<typeof res>({
        message: expect.any(String),
        playlists: pagingObject({
            value: res.playlists,
            endpoint: 'playlists',
            testObj: playlistObject,
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

    expect(res).toStrictEqual<typeof res>(
        pagingObject({
            value: res,
            endpoint: 'category’s playlists',
            testObj: playlistObject,
        })
    )
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

    expect(res).toStrictEqual<typeof res>(recommendationsObject(res))
})
