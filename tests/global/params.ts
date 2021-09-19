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
    [key in keyof typeof requests]?: Defined<Parameters<typeof requests[key]>>
} = {
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
    getAllFeaturedPlaylists: [
        token,
        {
            country: market,
            locale: locale,
            timestamp: timestamp,
            limit: limit,
            offset: offset,
        }
    ]
}

export default params
