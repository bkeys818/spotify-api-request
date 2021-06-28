import type { Globals } from '../../jest.config'
import { getMultipleShows, getShow, getShowsEpisodes } from '../../src/api/shows'
import { SimplifiedShowObject, ShowObject, SimplifiedEpisodeObject } from '../../src/api/objects'
import { contextObject, testCopyrightObject, testImageObject, pagingObject } from './global'
import { testSimplifiedEpisodeObject } from './episodes.test'

export function testSimplifiedShowObject(value: SimplifiedShowObject): SimplifiedShowObject {
    const expectedObj: SimplifiedShowObject = {
        ...contextObject('show'),
        available_markets: expect.any(Array),
        copyrights: expect.any(Array),
        description: expect.any(String),
        explicit: expect.any(Boolean),
        id: expect.any(String),
        images: expect.any(Array),
        is_externally_hosted: value.is_externally_hosted ? expect.any(Boolean) : null,
        languages: expect.any(Array),
        media_type: expect.any(String),
        name: expect.any(String),
        publisher: expect.any(String),
    }

    value.available_markets.forEach(available_market => {
        expect(available_market).toEqual(expect.any(String))
    })

    value.copyrights.forEach(testCopyrightObject)

    value.images.forEach(testImageObject)

    value.languages.forEach(language => {
        expect(language).toEqual(expect.any(String))
    })

    expect(value).toMatchObject(expectedObj)

    return expectedObj
}

export function testShowObject(value: ShowObject): ShowObject {
    const expectedObj: ShowObject = {
        ...testSimplifiedShowObject(value),
        episodes: expect.any(Array)
    }
    value.episodes.forEach(testSimplifiedEpisodeObject)
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

const token = (global as unknown as Globals).testData.token
const showIDs = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']

test(getMultipleShows.name, async () => {
    const res = await getMultipleShows(token, showIDs)
    expect(res).toMatchObject<typeof res>({
        shows: expect.any(Array)
    })
    res.shows.forEach(testSimplifiedShowObject)
})

test(getShow.name, async () => {
    const res = await getShow(token, showIDs[0])
    testShowObject(res)
})

test(getShowsEpisodes.name, async () => {
    const res = await getShowsEpisodes(token, showIDs[0])
    expect(res).toMatchObject<typeof res>(pagingObject<SimplifiedEpisodeObject>({
        value: res,
        url: expect.stringMatching(
            /https:\/\/api\.spotify\.com\/v1\/shows\/[a-z\d]+\/episodes(\\?.+)?/i
        ),
        itemTest: testSimplifiedEpisodeObject
    }))
})