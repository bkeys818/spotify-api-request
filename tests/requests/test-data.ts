import type * as requests from '../../src/requests'
import type { responses } from '../types/responses'
import type { params } from '../global'
import type { sendRequest } from '../../src/global'

export const token = 'abc'
export const unmodifiedRes = { dont: 'modify' as const }

export default format({
    Albums: {
        getMultipleAlbums: {
            endpoint: 'albums',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: {
                        queryParameter: { ids: params[0] },
                    },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        queryParameter: {
                            ids: params[0],
                            market: params[1].market,
                        },
                    },
                },
            }),
        },
        getAlbum: {
            endpoint: 'albums/{id}',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: {
                        pathParameter: { id: params[0] },
                    },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { id: params[0] },
                        queryParameter: { market: params[1].market },
                    },
                },
            }),
        },
    },
    Artists: {
        getMultipleArtists: {
            endpoint: 'artists',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: { queryParameter: { ids: params[0] } },
                },
            }),
        },
        getArtist: {
            endpoint: 'artists/{id}',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: { pathParameter: { id: params[0] } },
                },
            }),
        },
        getArtistTopTracks: {
            endpoint: 'artists/{id}/top-tracks',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: {
                        pathParameter: { id: params[0] },
                        queryParameter: params[1]
                    },
                },
            }),
        },
        getArtistRelatedArtists: {
            endpoint: 'artists/{id}/related-artists',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: { pathParameter: { id: params[0] } },
                },
            }),
        },
        getArtistAlbums: {
            endpoint: 'artists/{id}/albums',
            params: (params) => {
                const { include_groups, ...otherParams } = params[1]
                const includeGroupsArr =
                    typeof include_groups == 'string'
                        ? [include_groups]
                        : include_groups
                const includeGroupsStr = includeGroupsArr[0]
                return {
                    'required parameters': {
                        send: [params[0]],
                        expect: {
                            pathParameter: { id: params[0] },
                        },
                    },
                    'all parameters (include_groups array)': {
                        send: [
                            params[0],
                            {
                                ...otherParams,
                                include_groups: includeGroupsArr,
                            },
                        ],
                        expect: {
                            pathParameter: { id: params[0] },
                            queryParameter: {
                                ...otherParams,
                                include_groups: includeGroupsArr,
                            },
                        },
                    },
                    'all parameters (include_groups string)': {
                        send: [
                            params[0],
                            {
                                ...otherParams,
                                include_groups: includeGroupsStr,
                            },
                        ],
                        expect: {
                            pathParameter: { id: params[0] },
                            queryParameter: {
                                ...otherParams,
                                include_groups: includeGroupsStr,
                            },
                        },
                    },
                }
            },
        },
    },
    Browse: {
        getAllNewReleases: {
            endpoint: 'browse/new-releases',
            params: (params) => ({
                'required parameters': undefined,
                'all parameters': {
                    send: params,
                    expect: { queryParameter: params[0] },
                },
            }),
        },
        getAllFeaturedPlaylists: {
            endpoint: 'browse/featured-playlists',
            params: (params) => ({
                'required parameters': undefined,
                'all parameters': {
                    send: params,
                    expect: { queryParameter: params[0] },
                },
            }),
        },
        getAllCategories: {
            endpoint: 'browse/categories',
            params: (params) => ({
                'required parameters': undefined,
                'all parameters': {
                    send: params,
                    expect: { queryParameter: params[0] },
                },
            }),
        },
        getCategory: {
            endpoint: 'browse/categories/{category_id}',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: { pathParameter: { category_id: params[0] } },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { category_id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getCategoryPlaylists: {
            endpoint: 'browse/categories/{category_id}/playlists',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: { pathParameter: { category_id: params[0] } },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { category_id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getRecommendationGenres: {
            endpoint: 'recommendations/available-genre-seeds',
            params: (_) => ({
                'required parameters': undefined,
            }),
        },
    },
    Episodes: {
        getMultipleEpisodes: {
            endpoint: 'episodes',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: {
                        queryParameter: { ids: params[0] },
                    },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        queryParameter: { ids: params[0], ...params[1] },
                    },
                },
            }),
        },
        getEpisode: {
            endpoint: 'episodes/{id}',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: {
                        pathParameter: { id: params[0] },
                    },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
    },
    Follow: {
        checkIfUsersFollowPlaylist: {
            endpoint: 'playlists/{playlist_id}/followers/contains',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: {
                        pathParameter: { playlist_id: params[0] },
                        queryParameter: { ids: params[1] },
                    },
                },
            }),
        },
        getUserFollowedArtists: {
            endpoint: 'me/following',
            params: (params) => {
                const { type: typeValue, ...optionalValues } = params[0]
                const type = { type: typeValue }
                const all = { ...type, ...optionalValues }
                return {
                    'required parameters': {
                        send: [type],
                        expect: { queryParameter: type },
                    },
                    'all parameters': {
                        send: [all],
                        expect: { queryParameter: all },
                    },
                }
            },
        },
        getFollowingStateForArtistsOrUsers: {
            endpoint: 'me/following/contains',
            params: (params) => ({
                'required parameters (artist)': {
                    send: ['artist', params[1]],
                    expect: {
                        queryParameter: {
                            type: 'artist',
                            ids: params[1],
                        },
                    },
                },
                'required parameters (user)': {
                    send: ['user', params[1]],
                    expect: {
                        queryParameter: {
                            type: 'user',
                            ids: params[1],
                        },
                    },
                },
            }),
        },
    },
    Library: library(),
    Markets: {
        getAvailableMarkets: {
            endpoint: 'markets',
            params: (_) => ({
                'required parameters': undefined,
            }),
        },
    },
    Personalization: {
        getUserTopArtistsandTracks: {
            endpoint: 'me/top/{type}',
            params: (params) => ({
                'required parameters (artists)': {
                    send: ['artists'],
                    expect: { pathParameter: { type: 'artists' } },
                },
                'all parameters (artists)': {
                    send: ['artists', params[1]],
                    expect: {
                        pathParameter: { type: 'artists' },
                        queryParameter: params[1],
                    },
                },
                'required parameters (tracks)': {
                    send: ['tracks'],
                    expect: { pathParameter: { type: 'tracks' } },
                },
                'all parameters (tracks)': {
                    send: ['tracks', params[1]],
                    expect: {
                        pathParameter: { type: 'tracks' },
                        queryParameter: params[1],
                    },
                },
            }),
        },
    },
    Playlist: {
        getListOfCurrentUserPlaylists: {
            endpoint: 'me/playlists',
            params: (params) => ({
                'required parameters': undefined,
                'all parameters': {
                    send: params,
                    expect: { queryParameter: params[0] },
                },
            }),
        },
        getListOfUserPlaylists: {
            endpoint: 'users/{user_id}/playlists',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: { pathParameter: { user_id: params[0] } },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { user_id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getPlaylist: {
            endpoint: 'playlists/{playlist_id}',
            params: (params) => ({
                'required parameters': {
                    send: [params[0]],
                    expect: { pathParameter: { playlist_id: params[0] } },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { playlist_id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getPlaylistItems: {
            endpoint: 'playlists/{playlist_id}/tracks',
            params: (params) => ({
                'required parameters': {
                    send: [params[0], { market: params[1].market }],
                    expect: {
                        pathParameter: { playlist_id: params[0] },
                        queryParameter: { market: params[1].market },
                    },
                },
                'all parameters': {
                    send: params,
                    expect: {
                        pathParameter: { playlist_id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getPlaylistCoverImage: {
            endpoint: 'playlists/{playlist_id}/images',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: { pathParameter: { playlist_id: params[0] } },
                },
            }),
        },
    },
    Shows: {
        getMultipleShows: {
            endpoint: 'shows',
            params: (params) => ({
                'required params': {
                    send: [params[0]],
                    expect: { queryParameter: { ids: params[0] } },
                },
                'all params': {
                    send: params,
                    expect: {
                        queryParameter: { ids: params[0], ...params[1] },
                    },
                },
            }),
        },
        getShow: {
            endpoint: 'shows/{id}',
            params: (params) => ({
                'required params': {
                    send: [params[0]],
                    expect: { pathParameter: { id: params[0] } },
                },
                'all params': {
                    send: params,
                    expect: {
                        pathParameter: { id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getShowEpisodes: {
            endpoint: 'shows/{id}/episodes',
            params: (params) => ({
                'required params': {
                    send: [params[0]],
                    expect: { pathParameter: { id: params[0] } },
                },
                'all params': {
                    send: params,
                    expect: {
                        pathParameter: { id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
    },
    Tracks: {
        getSeveralTracks: {
            endpoint: 'tracks',
            params: (params) => ({
                'required params': {
                    send: [params[0]],
                    expect: { queryParameter: { ids: params[0] } },
                },
                'all params': {
                    send: params,
                    expect: {
                        queryParameter: { ids: params[0], ...params[1] },
                    },
                },
            }),
        },
        getTrack: {
            endpoint: 'tracks/{id}',
            params: (params) => ({
                'required params': {
                    send: [params[0]],
                    expect: { pathParameter: { id: params[0] } },
                },
                'all params': {
                    send: params,
                    expect: {
                        pathParameter: { id: params[0] },
                        queryParameter: params[1],
                    },
                },
            }),
        },
        getAudioFeaturesforSeveralTracks: {
            endpoint: 'audio-features',
            params: (params) => ({
                'required params': {
                    send: params,
                    expect: { queryParameter: { ids: params[0] } },
                },
            }),
        },
        getAudioFeaturesforTrack: {
            endpoint: 'audio-features/{id}',
            params: (params) => ({
                'required params': {
                    send: params,
                    expect: { pathParameter: { id: params[0] } },
                },
            }),
        },
        getAudioAnalysisforTrack: {
            endpoint: 'audio-analysis/{id}',
            params: (params) => ({
                'required params': {
                    send: params,
                    expect: { pathParameter: { id: params[0] } },
                },
            }),
        },
    },
    'User Profile': {
        getCurrentUserProfile: {
            endpoint: 'me',
            params: (_) => ({ 'required parameters': undefined }),
        },
        getUserProfile: {
            endpoint: 'users/{user_id}',
            params: (params) => ({
                'required parameters': {
                    send: params,
                    expect: { pathParameter: { user_id: params[0] } },
                },
            }),
        },
    },
})

function library() {
    let requests: TestData[string] = {}

    const types = ['Albums', 'Episodes', 'Shows', 'Tracks'] as const
    for (const type of types) {
        const name = `UsersSaved${type}` as const
        const endpoint = 'me/' + type.toLowerCase()
        requests[`get${name}` as const] = {
            endpoint: endpoint,
            params: (params: GetParams) => ({
                'required parameters': undefined,
                'all parameters': {
                    send: params,
                    expect: { queryParameter: params[0] },
                },
            }),
        }
        requests[`check${name}` as const] = {
            endpoint: endpoint + '/contains',
            params: (params: CheckParams) => ({
                'required parameters': {
                    send: params,
                    expect: { queryParameter: { ids: params[0] } },
                },
            }),
        }
        type GetParams = DropFirst<typeof params[`get${typeof name}`]>
        type CheckParams = DropFirst<typeof params[`check${typeof name}`]>
    }

    return requests
}

function format(data: TestData) {
    return Object.keys(data).map((category) => ({
        name: category,
        values: data[category],
    }))
}

export type ResponseKey = keyof typeof responses
interface TestData {
    [key: string]: {
        [key in ResponseKey]?: MethodData<key> | 'todo'
    }
}
interface MethodData<K extends ResponseKey> {
    endpoint: string
    params: (
        value: DropFirst<typeof params[K]>
    ) => ParameterValues<typeof requests[K]>
    /** Default value - {@link unmodifiedRes} */
    response?: {
        send: any
        expect: any
    }
}
interface ParameterValues<M extends typeof requests[ResponseKey]> {
    [key: string]:
        | {
              send: DropFirst<Parameters<M>>
              expect: Omit<
                  Parameters<typeof sendRequest>[0],
                  'endpoint' | 'method' | 'token'
              >
          }
        | undefined
}
type DropFirst<T extends any[]> = T extends [infer _, ...infer R] ? R : never
