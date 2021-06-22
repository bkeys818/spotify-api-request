import { Token } from './authorize'
import { getMultipleAlbums, getAlbum, getAlbumsTracks } from './api/albums'
import {
    getListOfCurrentUsersPlaylists,
    getListOfUsersPlaylists,
    createPlaylist,
    getPlaylist,
    changePlaylistsDetails,
    getPlaylistsItems,
    addItemsToPlaylist,
    reorderOReplacePlaylistsItems,
    removeItemsFromPlaylist,
    getPlaylistCoverImage,
    uploadCustomPlaylistCoverImage,
} from './api/playlists'

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
    getPlaylistsItems: OmitFirstParam<typeof getPlaylistsItems>
    addItemsToPlaylist: OmitFirstParam<typeof addItemsToPlaylist>
    reorderOReplacePlaylistsItems: OmitFirstParam<typeof reorderOReplacePlaylistsItems>
    removeItemsFromPlaylist: OmitFirstParam<typeof removeItemsFromPlaylist>
    getPlaylistCoverImage: OmitFirstParam<typeof getPlaylistCoverImage>
    uploadCustomPlaylistCoverImage: OmitFirstParam<typeof uploadCustomPlaylistCoverImage>
}

export default class SpotifyApi implements StaticSpotifyApi {
    /** @type {Token} */
    private readonly token: Token
    constructor(token: Token) {
        this.token = token
    }

    static getMultipleAlbums = getMultipleAlbums
    getMultipleAlbums(
        ids: Parameters<typeof getMultipleAlbums>[1],
        options?: Parameters<typeof getMultipleAlbums>[2],
    ) {
        return getMultipleAlbums(this.token, ids, options)
    }
    static getAlbum = getAlbum
    getAlbum(
        id: Parameters<typeof getAlbum>[1],
        options?: Parameters<typeof getAlbum>[2],
    ) {
        return getAlbum(this.token, id, options)
    }
    static getAlbumsTracks = getAlbumsTracks
    getAlbumsTracks(
        id: Parameters<typeof getAlbumsTracks>[1],
        options?: Parameters<typeof getAlbumsTracks>[2],
    ) {
        return getAlbumsTracks(this.token, id, options)
    }

    static getListOfCurrentUsersPlaylists = getListOfCurrentUsersPlaylists
    getListOfCurrentUsersPlaylists(
        options?: Parameters<typeof getListOfCurrentUsersPlaylists>[1],
    ) {
        return SpotifyApi.getListOfCurrentUsersPlaylists(this.token, options)
    }
    static getListOfUsersPlaylists = getListOfUsersPlaylists
    getListOfUsersPlaylists(
        userId: Parameters<typeof getListOfUsersPlaylists>[1],
        options?: Parameters<typeof getListOfUsersPlaylists>[2],
    ) {
        return SpotifyApi.getListOfUsersPlaylists(this.token, userId, options)
    }
    static createPlaylist = createPlaylist
    createPlaylist(
        userId: Parameters<typeof createPlaylist>[1],
        options: Parameters<typeof createPlaylist>[2],
    ) {
        return SpotifyApi.createPlaylist(this.token, userId, options)
    }
    static getPlaylist = getPlaylist
    getPlaylist(
        playlistId: Parameters<typeof getPlaylist>[1],
        options?: Parameters<typeof getPlaylist>[2],
    ) {
        return SpotifyApi.getPlaylist(this.token, playlistId, options)
    }
    static changePlaylistsDetails = changePlaylistsDetails
    changePlaylistsDetails(
        playlistId: Parameters<typeof changePlaylistsDetails>[1],
        options: Parameters<typeof changePlaylistsDetails>[2],
    ) {
        return SpotifyApi.changePlaylistsDetails(this.token, playlistId, options)
    }
    static getPlaylistsItems = getPlaylistsItems
    getPlaylistsItems(
        playlistId: Parameters<typeof getPlaylistsItems>[1],
        options: Parameters<typeof getPlaylistsItems>[2],
    ) {
        return SpotifyApi.getPlaylistsItems(this.token, playlistId, options)
    }
    static addItemsToPlaylist = addItemsToPlaylist
    addItemsToPlaylist(
        playlistId: Parameters<typeof addItemsToPlaylist>[1],
        options?: Parameters<typeof addItemsToPlaylist>[2],
    ) {
        return SpotifyApi.addItemsToPlaylist(this.token, playlistId, options)
    }
    static reorderOReplacePlaylistsItems = reorderOReplacePlaylistsItems
    reorderOReplacePlaylistsItems(
        playlistId: Parameters<typeof reorderOReplacePlaylistsItems>[1],
        options: Parameters<typeof reorderOReplacePlaylistsItems>[2],
    ) {
        return SpotifyApi.reorderOReplacePlaylistsItems(this.token, playlistId, options)
    }
    static removeItemsFromPlaylist = removeItemsFromPlaylist
    removeItemsFromPlaylist(
        playlistId: Parameters<typeof removeItemsFromPlaylist>[1],
        tracks: Parameters<typeof removeItemsFromPlaylist>[2],
    ) {
        return SpotifyApi.removeItemsFromPlaylist(this.token, playlistId, tracks)
    }
    static getPlaylistCoverImage = getPlaylistCoverImage
    getPlaylistCoverImage(
        playlistId: Parameters<typeof getPlaylistCoverImage>[1],
    ) {
        return SpotifyApi.getPlaylistCoverImage(this.token, playlistId)
    }
    static uploadCustomPlaylistCoverImage = uploadCustomPlaylistCoverImage
    uploadCustomPlaylistCoverImage(
        playlistId: Parameters<typeof uploadCustomPlaylistCoverImage>[1],
        image: Parameters<typeof uploadCustomPlaylistCoverImage>[2],
    ) {
        return SpotifyApi.uploadCustomPlaylistCoverImage(this.token, playlistId, image)
    }
}