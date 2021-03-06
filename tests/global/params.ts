import type * as requests from '../../src/requests'
import {
    token,
    albumIDs,
    artistIDs,
    categoryIDs,
    episodeIds,
    playlistIDs,
    showIDs,
    trackIds,
    userIDs,
} from '.'

const market = 'US'
const locale = 'en_US'
const limit = 10
const offset = 3
const timestamp = '2021-10-18T09:00:00'

type Defined<T> = {
    [key in keyof T]-?: T extends boolean | number | string | undefined | null
        ? T[key]
        : Defined<T[key]>
}

const params: {
    [key in keyof typeof requests]: Defined<Parameters<typeof requests[key]>>
} = {
    // albums
    getMultipleAlbums: [token, albumIDs, { market: market }],
    getAlbum: [token, albumIDs[0], { market: market }],
    getAlbumTracks: [
        token,
        albumIDs[0],
        {
            market: market,
            limit: limit,
            offset: offset,
        },
    ],

    // artists
    getMultipleArtists: [token, artistIDs],
    getArtist: [token, artistIDs[0]],
    getArtistTopTracks: [token, artistIDs[0], { market: market }],
    getArtistRelatedArtists: [token, artistIDs[0]],
    getArtistAlbums: [
        token,
        artistIDs[0],
        {
            include_groups: ['album', 'single', 'appears_on', 'compilation'],
            market: market,
            limit: limit,
            offset: offset,
        },
    ],

    // browse
    getAllNewReleases: [
        token,
        { country: market, limit: limit, offset: offset },
    ],
    getAllFeaturedPlaylists: [
        token,
        {
            country: market,
            locale: locale,
            timestamp: timestamp,
            limit: limit,
            offset: offset,
        },
    ],
    getAllCategories: [
        token,
        {
            country: market,
            locale: locale,
            limit: limit,
            offset: offset,
        },
    ],
    getCategory: [token, categoryIDs[0], { country: market, locale: locale }],
    getCategoryPlaylists: [
        token,
        categoryIDs[0],
        { country: market, limit: limit, offset: offset },
    ],
    getRecommendations: null as any,
    getRecommendationGenres: [token],

    // episodes
    getMultipleEpisodes: [token, episodeIds, { market: market }],
    getEpisode: [token, episodeIds[0], { market: market }],

    // follow
    followPlaylist: null as any,
    unfollowPlaylist: null as any,
    checkIfUsersFollowPlaylist: [token, playlistIDs[0], userIDs],
    getUserFollowedArtists: [token, { type: 'artist', limit: limit } as any],
    followArtistsOrUsers: null as any,
    unfollowArtistsOrUsers: null as any,
    getFollowingStateForArtistsOrUsers: [token, 'artist', artistIDs],

    // library
    getCurrentUserSavedAlbums: [
        token,
        { limit: limit, offset: offset, market: market },
    ],
    saveAlbumsForCurrentUser: null as any,
    removeAlbumsForCurrentUser: null as any,
    checkCurrentUserSavedAlbums: [token, albumIDs],
    getCurrentUserSavedTracks: [
        token,
        { limit: limit, offset: offset, market: market },
    ],
    saveTracksForCurrentUser: null as any,
    removeTracksForCurrentUser: null as any,
    checkCurrentUserSavedTracks: [token, trackIds],
    getCurrentUserSavedEpisodes: [
        token,
        { limit: limit, offset: offset, market: market },
    ],
    saveEpisodesForCurrentUser: null as any,
    removeEpisodesForCurrentUser: null as any,
    checkCurrentUserSavedEpisodes: [token, episodeIds],
    getCurrentUserSavedShows: [token, { limit: limit, offset: offset }],
    saveShowsForCurrentUser: null as any,
    removeShowsForCurrentUser: null as any,
    checkCurrentUserSavedShows: [token, showIDs],

    // markets
    getAvailableMarkets: [token],

    // personalization
    getUserTopArtistsAndTracks: [
        token,
        'artists',
        { time_range: 'long_term', limit: limit, offset: offset },
    ],

    // playlists
    getListOfCurrentUserPlaylists: [token, { limit: limit, offset: offset }],
    getListOfUserPlaylists: [
        token,
        userIDs[0],
        { limit: limit, offset: offset },
    ],
    createPlaylist: null as any,
    getPlaylist: [
        token,
        playlistIDs[0],
        { market: market, additional_types: 'track' } as any,
    ],
    changePlaylistDetails: null as any,
    getPlaylistItems: [
        token,
        playlistIDs[0],
        {
            market: market,
            limit: limit,
            offset: offset,
            additional_types: 'track',
        } as any,
    ],
    addItemsToPlaylist: null as any,
    reorderPlaylistItems: null as any,
    replacePlaylistItems: null as any,
    removeItemsFromPlaylist: null as any,
    getPlaylistCoverImage: [token, playlistIDs[0]],
    uploadCustomPlaylistCoverImage: null as any,

    // search
    searchForItem: [
        token,
        {
            q: 'pursuit of happiness',
            type: 'tracks',
            market: market,
            limit: limit,
            offset: offset,
            include_external: 'audio',
        },
    ],

    // shows
    getMultipleShows: [token, showIDs, { market: market }],
    getShow: [token, showIDs[0], { market: market }],
    getShowEpisodes: [
        token,
        showIDs[0],
        { market: market, limit: limit, offset: offset },
    ],

    // tracks
    getMultipleTracks: [token, trackIds, { market: market }],
    getTrack: [token, trackIds[0], { market: market }],
    getAudioFeaturesForSeveralTracks: [token, trackIds],
    getAudioFeaturesForTrack: [token, trackIds[0]],
    getAudioAnalysisForTrack: [token, trackIds[0]],

    // user-profile
    getCurrentUserProfile: [token],
    getUserProfile: [token, userIDs[0]],
}

export default params
