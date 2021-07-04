import {
    getAllNewReleases,
    getAllFeaturedPlaylists,
    getAllCategories,
    getCategory,
    getCategorysPlaylists,
    getRecommendations,
    getRecommendationGenres,
} from '../../src/api/browse'
import {
    pagingObject,
    url,
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
        albums: pagingObject<typeof res.albums.items[number]>({
            value: res.albums,
            url: url(/albums\/[a-z\d]+/, true),
            testObj: albumObject,
        }),
    })
})

test(getAllFeaturedPlaylists.name, async () => {
    const res = await getAllFeaturedPlaylists(token)

    expect(res).toStrictEqual<typeof res>({
        message: expect.any(String),
        playlists: pagingObject<typeof res.playlists.items[number]>({
            value: res.playlists,
            url: url(/playlists\/[a-z\d]+/, true),
            testObj: playlistObject,
        }),
    })
})

test(getAllCategories.name, async () => {
    const res = await getAllCategories(token)

    expect(res).toStrictEqual<typeof res>({
        categories: pagingObject<typeof res.categories.items[number]>({
            value: res.categories,
            url: url(/browse\/categories\/[a-z\d]+/, true),
            testObj: categoryObject,
        }),
    })
})

test(getCategory.name, async () => {
    const res = await getCategory(token, categoryID)
    expect(res).toStrictEqual<typeof res>(categoryObject(res))
})

test(getCategorysPlaylists.name, async () => {
    const res = await getCategorysPlaylists(token, categoryID)

    expect(res).toStrictEqual<typeof res>(
        pagingObject<typeof res.items[number]>({
            value: res,
            url: url(/playlists\/[a-z\d]+/, true),
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
