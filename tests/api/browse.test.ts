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
    AlbumObject,
    PlaylistObject,
    CategoryObject,
    RecommendationsObject,
} from '../../src/api/objects'
import { pagingObject, testImageObject } from './global'
import { testAlbumObject, albumsUrlRegExp } from './albums.test'
import { testPlaylistObject, playlistsUrlRegExp } from './playlists.test'
import { artistsUrlRegExp, artistIDs } from './artists.test'
import { tracksUrlRegExp, testSimplifiedTrackObject, trackIds } from './tracks.test'

const categoriesUrlRegExp = /https:\/\/api\.spotify\.com\/v1\/browse\/categories\/[a-z\d]+/i

function testCategoryObject(value: CategoryObject): CategoryObject {
    const expectedObj: CategoryObject = {
        href: expect.stringMatching(categoriesUrlRegExp),
        icons: expect.any(Array),
        id: expect.any(String),
        name: expect.any(String),
    }
    expect(value).toMatchObject(expectedObj)
    value.icons.forEach(testImageObject)
    return expectedObj
}

function testRecommendationsObject(
    value: RecommendationsObject
): RecommendationsObject {
    const expectedObj: RecommendationsObject = {
        seeds: expect.any(Array),
        tracks: expect.any(Array),
    }
    value.seeds.forEach((seed) => {
        expect(seed).toMatchObject<typeof seed>({
            afterFilteringSize: expect.any(Number),
            afterRelinkingSize: expect.any(Number),
            href:
                seed.type == 'artist'
                    ? expect.stringMatching(artistsUrlRegExp)
                    : seed.type == 'track'
                    ? expect.stringMatching(tracksUrlRegExp)
                    : null,
            id: expect.any(String),
            initialPoolSize: expect.any(Number),
            type: expect.stringMatching(/artist|track|genre/),
        })
    })
    value.tracks.forEach(testSimplifiedTrackObject)
    return expectedObj
}

const categoryID = 'party'
// @ts-ignore
const token = global.token


test(getAllNewReleases.name, async () => {
    const res = await getAllNewReleases(token)
    expect(res).toMatchObject<typeof res>({
        message: expect.any(String),
        albums: pagingObject<AlbumObject>({
            value: res.albums,
            url: expect.stringMatching(albumsUrlRegExp),
            itemTest: testAlbumObject,
        }),
    })
})

test(getAllFeaturedPlaylists.name, async () => {
    const res = await getAllFeaturedPlaylists(token)
    expect(res).toMatchObject<typeof res>({
        message: expect.any(String),
        playlists: pagingObject<PlaylistObject>({
            value: res.playlists,
            url: expect.stringMatching(playlistsUrlRegExp),
            itemTest: testPlaylistObject,
        }),
    })
})

test(getAllCategories.name, async () => {
    const res = await getAllCategories(token)
    expect(res).toMatchObject<typeof res>({
        categories: pagingObject<CategoryObject>({
            value: res.categories,
            url: expect.stringMatching(categoriesUrlRegExp),
            itemTest: testCategoryObject,
        }),
    })
})

test(getCategory.name, async () => {
    const res = await getCategory(token, categoryID)
    testCategoryObject(res)
})

test(getCategorysPlaylists.name, async () => {
    const res = await getCategorysPlaylists(token, categoryID)
    expect(res).toMatchObject<typeof res>(
        pagingObject<PlaylistObject>({
            value: res,
            url: expect.stringMatching(playlistsUrlRegExp),
            itemTest: testPlaylistObject,
        })
    )
})

test(getRecommendations.name, async () => {
    const res = await getRecommendations(token, {
        seed_artists: artistIDs[0],
        seed_tracks: trackIds[0],
        seed_genres: categoryID,
    })
    testRecommendationsObject(res)
})

test(getRecommendationGenres.name, async () => {
    const res = await getRecommendationGenres(token)
    testRecommendationsObject(res)
})
