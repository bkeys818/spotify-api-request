// import type { Globals } from '../../jest.config'
// import { getMultipleAlbums, getAlbum, getAlbumsTracks } from '../../src/api/tracks'
import { SimplifiedTrackObject, TrackObject } from '../../src/api/objects'
import { } from './global'

export const tracksUrlRegExp = /https:\/\/api\.spotify\.com\/v1\/tracks\/[a-z\d]+/i

export function simplifiedTrackObject(_: SimplifiedTrackObject): SimplifiedTrackObject {
    return expect.any(Object)
}

export function trackObject(_: TrackObject): TrackObject {
    return expect.any(Object)
}

// const token = (global as unknown as Globals).testData.token
export const trackIds = ['3WWAvWDBQANpJeNbvVbjMg', '0TXK1dsiK9lkeaK6neSP2j']