import * as requests from '../../src/requests'
import { token, params } from '../global'
import fetch, { Response } from 'node-fetch'
import { mocked } from 'ts-jest/utils'

jest.mock('node-fetch', () => ({
    __esModule: true,
    default: jest.fn(),
}))

function spotifyUrl(endpoint: string, pathParams?: { [key: string]: string }) {
    let url = 'https://api.spotify.com/v1/' + endpoint
    for (const key in pathParams) url = url.replace(`{${key}}`, pathParams[key])
    return url
}
const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
}
const basicFetchInit = { headers: headers, method: 'GET' }

afterEach(() => {
    mocked(fetch).mockClear()
})

type A = (values: typeof params[keyof typeof requests]) => void

const testData: [
    string,
    {
        [key in keyof typeof requests]?:
            | ((values: Exclude<typeof params[key], undefined>) => {
                  fetchParams: Parameters<typeof fetch>
                  query?: { [key: string]: string }
              })
            | 'todo'
    }
][] = [
    [
        'Albums',
        {
            getMultipleAlbums: (params) => ({
                fetchParams: [spotifyUrl('albums'), basicFetchInit],
                query: { ids: params[1].join(), ...params[2] },
            }),
            getAlbum: (params) => ({
                fetchParams: [
                    spotifyUrl('albums/{id}', { id: params[1] }),
                    basicFetchInit,
                ],
                query: params[2],
            }),
            getAlbumTracks: (params) => ({
                fetchParams: [
                    spotifyUrl('albums/{id}', { id: params[1] }),
                    basicFetchInit,
                ],
                query: {
                    ...params[2],
                    limit: params[2].limit.toString(),
                    offset: params[2].offset.toString(),
                },
            }),
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
            getCurrentUserSavedAlbums: 'todo',
            getCurrentUserSavedEpisodes: 'todo',
            getCurrentUserSavedShows: 'todo',
            getCurrentUserSavedTracks: 'todo',
            checkCurrentUserSavedAlbums: 'todo',
            checkCurrentUserSavedEpisodes: 'todo',
            checkCurrentUserSavedShows: 'todo',
            checkCurrentUserSavedTracks: 'todo',
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
            getUserTopArtistsAndTracks: 'todo',
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
            getMultipleTracks: 'todo',
            getTrack: 'todo',
            getAudioFeaturesForSeveralTracks: 'todo',
            getAudioFeaturesForTrack: 'todo',
            getAudioAnalysisForTrack: 'todo',
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
                        return Promise.resolve({})
                    },
                } as Response)
            )
            test(name, async () => {
                const _params = params[name]!
                let { fetchParams, query } = expectedValues(_params as never)
                // @ts-ignore
                await requests[name](..._params)

                expect(fetch).toHaveBeenCalledTimes(1)

                if (query) {
                    const url = mocked(fetch).mock.calls[0][0].toString()
                    const queryObj: { [key: string]: string } = {}
                    for (const param of url
                        .slice(url.indexOf('?') + 1)
                        .split('&')) {
                        const [key, value] = param.split('=')
                        queryObj[key] = decodeURIComponent(value)
                    }
                    expect(queryObj).toStrictEqual(query)

                    const regExp = new RegExp(fetchParams[0].toString())
                    fetchParams[0] = expect.stringMatching(
                        new RegExp(regExp.source + '(\\?.+)?')
                    )
                }

                expect(fetch).toHaveBeenCalledWith(...fetchParams)
            })
        }
    }
})
