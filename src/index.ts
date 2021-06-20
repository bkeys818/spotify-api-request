import { Token } from './authorize'
import { getMultipleAlbums, getAlbum, getAlbumsTracks } from './api/albums'
import { getListOfCurrentUsersPlaylists, getListOfUsersPlaylists, createPlaylist, getPlaylist, changePlaylistsDetails } from './api/playlists'

type OmitFirstParam<F> = F extends (_: Token, ...args: infer P) => infer R ? (...args: P) => R : never

interface StaticSpotifyApi {
    getMultipleAlbums: OmitFirstParam<typeof getMultipleAlbums>
    getAlbum: OmitFirstParam<typeof getAlbum>
    getAlbumsTracks: OmitFirstParam<typeof getAlbumsTracks>

    getListOfCurrentUsersPlaylists: OmitFirstParam<typeof getListOfCurrentUsersPlaylists>
    getListOfUsersPlaylists: OmitFirstParam<typeof getListOfUsersPlaylists>
    createPlaylist: OmitFirstParam<typeof createPlaylist>
    getPlaylist: OmitFirstParam<typeof getPlaylist>
    changePlaylistsDetails: OmitFirstParam<typeof changePlaylistsDetails>
}

export default class SpotifyApi implements StaticSpotifyApi {
    /** @type {Token} */
    private readonly token: Token
    constructor(token: Token) {
        this.token = token
    }

    static getMultipleAlbums = getMultipleAlbums
    getMultipleAlbums(ids: string[], options?: { market: string }) {
        return getMultipleAlbums(this.token, ids, options)
    }
    static getAlbum = getAlbum
    getAlbum(id: string, options?: { market: string }) {
        return getAlbum(this.token, id, options)
    }
    static getAlbumsTracks = getAlbumsTracks
    getAlbumsTracks(id: string, options?: {
        market?: string
        limit?: number
        offset?: number
    }) {
        return getAlbumsTracks(this.token, id, options)
    }

    static getListOfCurrentUsersPlaylists = getListOfCurrentUsersPlaylists
    getListOfCurrentUsersPlaylists(options?: {
        limit?: number
        offset?: number
    }) {
        return getListOfCurrentUsersPlaylists(this.token, options)
    }
    static getListOfUsersPlaylists = getListOfUsersPlaylists
    getListOfUsersPlaylists(userId: string, options?: {
        limit?: number
        offset?: number
    }) {
        return getListOfUsersPlaylists(this.token, userId, options)
    }
    static createPlaylist = createPlaylist
    createPlaylist(userId: string, options: {
        name: string
        public?: boolean
        collaborative?: boolean
        description?: string
    }) {
        return createPlaylist(this.token, userId, options)
    }
    static getPlaylist = getPlaylist
    getPlaylist(playlistId: string, options?: {
        market?: string
        fields?: string
        additional_types?: string
    }) {
        return getPlaylist(this.token, playlistId, options)
    }
    static changePlaylistsDetails = changePlaylistsDetails
    changePlaylistsDetails(playlistId: string, options: {
        name: string
        public: boolean
        collaborative: boolean
        description: string
    }) {
        return changePlaylistsDetails(this.token, playlistId, options)
    }

}

