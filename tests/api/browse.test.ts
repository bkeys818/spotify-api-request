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
import { pagingObject, imageObject } from './global'
import { albumObject, albumsUrlRegExp } from './albums.test'
import { playlistObject, playlistsUrlRegExp } from './playlists.test'
import { artistsUrlRegExp, artistIDs } from './artists.test'
import { tracksUrlRegExp, simplifiedTrackObject, trackIds } from './tracks.test'

const categoriesUrlRegExp = /https:\/\/api\.spotify\.com\/v1\/browse\/categories\/[a-z\d]+/i

function categoryObject(value: CategoryObject): CategoryObject {
    return{
        href: expect.stringMatching(categoriesUrlRegExp),
        icons: expect.arrayContaining<typeof value['icons'][number]>(
            value.icons.map(imageObject)
        ),
        id: expect.any(String),
        name: expect.any(String),
    }
}

function recommendationsObject(
    value: RecommendationsObject
): RecommendationsObject {
    return {
        seeds: expect.arrayContaining<typeof value['seeds'][number]>(
                value.seeds.map(seed => ({
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
            }))
        ),
        tracks: expect.arrayContaining<typeof value['tracks'][number]>(
            value.tracks.map(simplifiedTrackObject)
        ),
    }
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
            itemTest: albumObject,
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
            itemTest: playlistObject,
        }),
    })
})

test(getAllCategories.name, async () => {
    const res = await getAllCategories(token)
    expect(res).toMatchObject<typeof res>({
        categories: pagingObject<CategoryObject>({
            value: res.categories,
            url: expect.stringMatching(categoriesUrlRegExp),
            itemTest: categoryObject,
        }),
    })
})

test(getCategory.name, async () => {
    const res = await getCategory(token, categoryID)
    expect(res).toMatchObject<typeof res>(categoryObject(res))
})

test(getCategorysPlaylists.name, async () => {
    const res = await getCategorysPlaylists(token, categoryID)
    expect(res).toMatchObject<typeof res>(
        pagingObject<PlaylistObject>({
            value: res,
            url: expect.stringMatching(playlistsUrlRegExp),
            itemTest: playlistObject,
        })
    )
})

test(getRecommendations.name, async () => {
    const res = await getRecommendations(token, {
        seed_artists: artistIDs[0],
        seed_tracks: trackIds[0],
        seed_genres: categoryID,
    })
    expect(res).toMatchObject<typeof res>(recommendationsObject(res))
})

test(getRecommendationGenres.name, async () => {
    const res = await getRecommendationGenres(token)
    expect(res).toMatchObject<typeof res>(recommendationsObject(res))
})
