import * as Albums from './albums'
// import * as Episodes from './episodes'
// import * as Library from './library'
import * as Playlists from './playlists'
// import * as Shows from './shows'
import * as Tracks from './tracks'

export const endpoints = {
    ...Albums.endpoints,
    ...Playlists.endpoints,
    ...Tracks.endpoints,
}

export type Name = keyof typeof endpoints
export type EndpointsInfo = typeof endpoints[keyof typeof endpoints]

export type RequestParams<R extends Name | EndpointsInfo> =
      R extends (Albums.Name | Albums.EndpointsInfo) ? Albums.RequestParams<R>
    : R extends (Playlists.Name | Playlists.EndpointsInfo) ? Playlists.RequestParams<R>
    : R extends (Tracks.Name | Tracks.EndpointsInfo) ? Tracks.RequestParams<R>
    : {};

export type Response<R extends Name | EndpointsInfo> =
      R extends (Albums.Name | Albums.EndpointsInfo) ? Albums.Response<R>
    : R extends (Playlists.Name | Playlists.EndpointsInfo) ? Playlists.Response<R>
    : R extends (Tracks.Name | Tracks.EndpointsInfo) ? Tracks.Response<R>
    : never;
