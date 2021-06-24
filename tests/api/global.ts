import fetch, { RequestInit } from 'node-fetch'
import type { Globals } from '../../jest.config'
import { Name, RequestParams, Response, endpoints } from '../../src/api'

const token = (global as unknown as Globals).testData.token

export type TestDataRow<N extends Name> = [N, RequestParams<N>, (response: Response<N>) => Promise<void>]
type Dictionary = { [key: string]: any }

export async function sendRequest<N extends Name>(name: N, request: RequestParams<N>): Promise<Response<N>> {
    let { url, method } = endpoints[name]
    
    if ('pathParameter' in request)
        for (const key in request['pathParameter']) {
            url = url.replace(
                key,
                (request['pathParameter'] as Dictionary)[key]
            ) as typeof url
        }

    if ('queryParameter' in request) {
        url =  url + '?' as typeof url
        for (const key in request['queryParameter']) {
            url = url + `${key}=${(request['queryParameter'] as Dictionary)[key]}&` as typeof url
        }
        url = url.slice(0, -1) as typeof url
    }

    const options: RequestInit = {
        method: method,
        headers: {
            Authorization: `${token.tokenType} ${token.accessToken}`
        }
    }

    if ('headers' in request)
        for (const key in request['headers']) {
            (options.headers as Dictionary)[key] = (request['headers'] as Dictionary)[key]
        }

    const res = await fetch(url, options)

    return await res.json()
}

type HasEndpoint = 'simplifiedAlbum' | 'album' | 'simplifiedArtist' | 'artist' | 'simplifiedEpisode' | 'episode' | 'simplifiedPlaylist' | 'playlist' | 'simplifiedShow' | 'show' | 'simplifiedTrack' | 'track' | 'playlistTracksRef' | 'playlistTrack' | 'category' | 'publicUser'
type HasEndpointTranslate<T extends HasEndpoint> = T extends 'simplifiedAlbum' ? SimplifiedAlbumObject : T extends 'album' ? AlbumObject : T extends 'simplifiedArtist' ? SimplifiedArtistObject : T extends 'artist' ? ArtistObject : T extends 'simplifiedEpisode' ? SimplifiedEpisodeObject : T extends 'episode' ? EpisodeObject : T extends 'simplifiedPlaylist' ? SimplifiedPlaylistObject : T extends 'playlist' ? PlaylistObject : T extends 'simplifiedShow' ? SimplifiedShowObject : T extends 'show' ? ShowObject : T extends 'simplifiedTrack' ? SimplifiedTrackObject : T extends 'track' ? TrackObject : T extends 'playlistTracksRef' ? PlaylistTracksRefObject : T extends 'playlistTrack' ? PlaylistTrackObject : T extends 'category' ? CategoryObject : T extends 'publicUser' ? PublicUserObject : never
const endpointUrls: {
    [key in HasEndpoint]: string
} = {
    'album': 'albums\\/[a-zA-Z\\d]+',
    'simplifiedAlbum': 'albums\\/[a-zA-Z\\d]+',
    'artist': 'artists\\/[a-zA-Z\\d]+',
    'simplifiedArtist': 'artists\\/[a-zA-Z\\d]+',
    'episode': 'episodes\\/[a-zA-Z\\d]+',
    'simplifiedEpisode': 'episodes\\/[a-zA-Z\\d]+',
    'playlist': 'playlists\\/[a-zA-Z\\d]+',
    'simplifiedPlaylist': 'playlists\\/[a-zA-Z\\d]+',
    'show': 'shows\\/[a-zA-Z\\d]+',
    'simplifiedShow': 'shows\\/[a-zA-Z\\d]+',
    'track': '(tracks\\/[a-zA-Z\\d]+)|(albums\\/[a-zA-Z\\d]+\\/tracks)',
    'simplifiedTrack': 'tracks\\/[a-zA-Z\\d]+',
    'playlistTrack': 'playlists\\/[a-zA-Z\\d]+\\/tracks',
    'playlistTracksRef': 'playlists\\/[a-zA-Z\\d]+\\/tracks',
    'category': 'categorys\\/[a-zA-Z\\d]+',
    'publicUser': 'users\\/[a-zA-Z\\d]+'
}
export const pagingObject = <
    T extends HasEndpoint,
    PO extends PagingObject<HasEndpointTranslate<T>>
>(type: T, value: PO, items: PO['items']) => {
    const href = expect.stringMatching(
        new RegExp('https:\\/\\/api\.spotify\.com\\/v1\\/' + endpointUrls[type] + '(\\?.+)?')
    )
    return {
        href: href,
        items: items,
        limit: expect.any(Number),
        next: (value.next === null ? null : href),
        offset: expect.any(Number),
        previous: (value.next === null ? null : href),
        total: expect.any(Number)
    } as PO
}