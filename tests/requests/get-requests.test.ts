import * as requests from '../../src/requests'
import {
    Unwrap,
    dataPath,
    token,
    albumIDs,
    artistIDs,
    categoryIDs,
    episodeIds,
    playlistIDs,
    showIDs,
    trackIds,
    userIDs,
} from '../global'
import fetch, { Response } from 'node-fetch'
import { mocked } from 'ts-jest/utils'
import { readFileSync } from 'fs'

jest.mock('node-fetch', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const responses: {
    [key in keyof typeof requests]: Unwrap<ReturnType<typeof requests[key]>>
} = JSON.parse(readFileSync(dataPath, 'utf-8'))

function spotifyUrl(endpoint: string, pathParams?: { [key: string]: string }) {
    let str = 'https://api.spotify.com/v1/' + endpoint
    for (const key in pathParams) str = str.replace(`{${key}}`, pathParams[key])
    const url = new URL(str)
    const regexp = new RegExp(url.href).source
    return expect.stringMatching(new RegExp(regexp + '(\\?.+)?'))
}
const headers = { Authorization: 'Bearer ' + token }
const basicFetchInit = { headers: headers, method: 'GET' }
const market = 'US'
const limit = 10
const offset = 3

afterEach(() => {
    mocked(fetch).mockClear()
})

const testData: [
    string,
    {
        [key in keyof typeof requests]?:
            | {
                  params: Parameters<typeof requests[key]>
                  fetchParams: Parameters<typeof fetch>
                  query?: { [key: string]: string }
              }
            | 'todo'
    }
][] = [
    [
        'Albums',
        {
            getMultipleAlbums: {
                params: [token, albumIDs, { market: market }],
                fetchParams: [spotifyUrl('albums'), basicFetchInit],
                query: { ids: albumIDs.join(), market: market },
            },
            getAlbum: {
                params: [token, albumIDs[0], { market: market }],
                fetchParams: [
                    spotifyUrl('albums/{id}', { id: albumIDs[0] }),
                    basicFetchInit,
                ],

                // query: { market: market },
            },
            getAlbumTracks: {
                params: [
                    token,
                    albumIDs[0],
                    {
                        market: market,
                        limit: limit,
                        offset: offset,
                    },
                ],
                fetchParams: [
                    spotifyUrl('albums/{id}', { id: albumIDs[0] }),
                    basicFetchInit,
                ],
                query: {
                    market: market,
                    limit: limit.toString(),
                    offset: offset.toString(),
                },
            },
        },
    ],
    [
        'Artists',
        {
            getMultipleArtists: 'todo',
            getArtist: 'todo',
            getArtistTopTracks: 'todo',
            getArtistRelatedArtists: 'todo',
            getArtistAlbums: 'todo',
        },
    ],

    [
        'Browse',
        {
            getAllNewReleases: 'todo',
            getAllFeaturedPlaylists: 'todo',
            getAllCategories: 'todo',
            getCategory: 'todo',
            getCategoryPlaylists: 'todo',
            getRecommendations: 'todo',
            getRecommendationGenres: 'todo',
        },
    ],

    [
        'Episodes',
        {
            getMultipleEpisodes: 'todo',
            getEpisode: 'todo',
        },
    ],

    [
        'Follow',
        {
            checkIfUsersFollowPlaylist: 'todo',
            getUserFollowedArtists: 'todo',
            getFollowingStateForArtistsOrUsers: 'todo',
        },
    ],

    [
        'Library',
        {
            getUsersSavedAlbums: 'todo',
            getUsersSavedEpisodes: 'todo',
            getUsersSavedShows: 'todo',
            getUsersSavedTracks: 'todo',
            checkUsersSavedAlbums: 'todo',
            checkUsersSavedEpisodes: 'todo',
            checkUsersSavedShows: 'todo',
            checkUsersSavedTracks: 'todo',
        },
    ],
    [
        'Markets',
        {
            getAvailableMarkets: 'todo',
        },
    ],
    [
        'Personalization',
        {
            getUserTopArtistsandTracks: 'todo',
        },
    ],
    [
        'Playlist',
        {
            getListOfCurrentUserPlaylists: 'todo',
            getListOfUserPlaylists: 'todo',
            getPlaylist: 'todo',
            getPlaylistItems: 'todo',
            getPlaylistCoverImage: 'todo',
        },
    ],

    [
        'Search',
        {
            searchForItem: 'todo',
        },
    ],

    [
        'Shows',
        {
            getMultipleShows: 'todo',
            getShow: 'todo',
            getShowEpisodes: 'todo',
        },
    ],

    [
        'Tracks',
        {
            getSeveralTracks: 'todo',
            getTrack: 'todo',
            getAudioFeaturesforSeveralTracks: 'todo',
            getAudioFeaturesforTrack: 'todo',
            getAudioAnalysisforTrack: 'todo',
        },
    ],

    [
        'User-Profile',
        {
            getCurrentUserProfile: 'todo',
            getUserProfile: 'todo',
        },
    ],
]

describe.each(testData)('%s', (_, funcs) => {
    for (const key in funcs) {
        const name = key as keyof typeof requests
        const expectedValues = funcs[name]!

        if (expectedValues === 'todo') test.todo(name)
        else {
            mocked(fetch).mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => {
                        return Promise.resolve(responses[name])
                    },
                } as Response)
            )
            test(name, async () => {
                // @ts-ignore
                await requests[name](...expectedValues.params)

                expect(fetch).toHaveBeenCalledTimes(1)
                expect(fetch).toHaveBeenCalledWith(
                    ...expectedValues.fetchParams
                )

                if (expectedValues.query) {
                    const url = mocked(fetch).mock.calls[0][0].toString()
                    const queryObj: { [key: string]: string } = {}
                    for (const param of url
                        .slice(url.indexOf('?') + 1)
                        .split('&')) {
                        const [key, value] = param.split('=')
                        queryObj[key] = decodeURIComponent(value)
                    }
                    expect(queryObj).toStrictEqual(expectedValues.query)
                }
            })
        }
    }
})
