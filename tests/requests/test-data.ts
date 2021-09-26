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
        getMultipleArtists: 'todo',
        getArtist: 'todo',
        getArtistTopTracks: 'todo',
        getArtistRelatedArtists: 'todo',
        getArtistAlbums: 'todo',
    },
    Browse: {
        getAllNewReleases: 'todo',
        getAllFeaturedPlaylists: 'todo',
        getAllCategories: 'todo',
        getCategory: 'todo',
        getCategoryPlaylists: 'todo',
        getRecommendations: 'todo',
        getRecommendationGenres: 'todo',
    },
    Episodes: {
        getMultipleEpisodes: 'todo',
        getEpisode: 'todo',
    },
    Follow: {
        checkIfUsersFollowPlaylist: 'todo',
        getUserFollowedArtists: 'todo',
        getFollowingStateForArtistsOrUsers: 'todo',
    },
    Library: {
        getUsersSavedAlbums: 'todo',
        getUsersSavedEpisodes: 'todo',
        getUsersSavedShows: 'todo',
        getUsersSavedTracks: 'todo',
        checkUsersSavedAlbums: 'todo',
        checkUsersSavedEpisodes: 'todo',
        checkUsersSavedShows: 'todo',
        checkUsersSavedTracks: 'todo',
    },
    Markets: {
        getAvailableMarkets: 'todo',
    },
    Personalizatio: {
        getUserTopArtistsandTracks: 'todo',
    },
    Playlist: {
        getListOfCurrentUserPlaylists: 'todo',
        getListOfUserPlaylists: 'todo',
        getPlaylist: 'todo',
        getPlaylistItems: 'todo',
        getPlaylistCoverImage: 'todo',
    },
    Search: {
        searchForItem: 'todo',
    },
    Shows: {
        getMultipleShows: 'todo',
        getShow: 'todo',
        getShowEpisodes: 'todo',
    },
    Tracks: {
        getSeveralTracks: 'todo',
        getTrack: 'todo',
        getAudioFeaturesforSeveralTracks: 'todo',
        getAudioFeaturesforTrack: 'todo',
        getAudioAnalysisforTrack: 'todo',
    },
    'User Profile': {
        getCurrentUserProfile: 'todo',
        getUserProfile: 'todo',
    },
})

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
    /** Default value - `"GET"` */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
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
    [key: string]: {
        send: DropFirst<Parameters<M>>
        expect: Omit<
            Parameters<typeof sendRequest>[0],
            'endpoint' | 'method' | 'token'
        >
    }
}
type DropFirst<T extends any[]> = T extends [infer _, ...infer R] ? R : never
