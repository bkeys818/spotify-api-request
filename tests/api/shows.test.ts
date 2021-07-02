import {
    getMultipleShows,
    getShow,
    getShowsEpisodes,
} from '../../src/api/shows'
import {
    SimplifiedShowObject,
    ShowObject,
    SimplifiedEpisodeObject,
} from '../../src/api/objects'
import {
    contextObject,
    copyrightObject,
    imageObject,
    pagingObject,
} from './global'
import { simplifiedEpisodeObject } from './episodes.test'

export const showsUrlRegExp = /https:\/\/api\.spotify\.com\/v1\/shows\/[a-z\d]+/

export function simplifiedShowObject(
    value: SimplifiedShowObject
): SimplifiedShowObject {
    return {
        ...contextObject('show'),
        available_markets: expect.arrayContaining<
            typeof value.available_markets[number]
        >([expect.any(String)]),
        copyrights: expect.arrayContaining<typeof value.copyrights[number]>([
            copyrightObject,
        ]),
        description: expect.any(String),
        explicit: expect.any(Boolean),
        id: expect.any(String),
        images: expect.arrayContaining<typeof value.images[number]>(
            value.images.map(imageObject)
        ),
        is_externally_hosted: value.is_externally_hosted
            ? expect.any(Boolean)
            : null,
        languages: expect.arrayContaining<typeof value.languages[number]>([
            expect.any(String),
        ]),
        media_type: expect.any(String),
        name: expect.any(String),
        publisher: expect.any(String),
    }
}

export function showObject(value: ShowObject): ShowObject {
    return {
        ...simplifiedShowObject(value),
        episodes: expect.arrayContaining<typeof value.episodes[number]>(
            value.episodes.map(simplifiedEpisodeObject)
        ),
    }
}

// @ts-ignore
const token = global.token
export const showIDs = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']

test(getMultipleShows.name, async () => {
    const res = await getMultipleShows(token, showIDs)
    expect(res).toMatchObject<typeof res>({
        shows: expect.arrayContaining<typeof res.shows[number]>(
            res.shows.map(simplifiedShowObject)
        ),
    })
})

test(getShow.name, async () => {
    const res = await getShow(token, showIDs[0])
    expect(res).toMatchObject<typeof res>(showObject(res))
})

test(getShowsEpisodes.name, async () => {
    const res = await getShowsEpisodes(token, showIDs[0])
    expect(res).toMatchObject<typeof res>(
        pagingObject<SimplifiedEpisodeObject>({
            value: res,
            url: expect.stringMatching(
                new RegExp(showsUrlRegExp + '/episodes(\\?.+)?', 'i')
            ),
            itemTest: simplifiedEpisodeObject,
        })
    )
})
