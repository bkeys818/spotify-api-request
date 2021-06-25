// import type { Globals } from '../../jest.config'
// import { getMultipleAlbums, getAlbum, getAlbumsTracks } from '../../src/api/tracks'
import { SimplifiedTrackObject, TrackObject } from '../../src/api/objects'
import { } from './global'

export function testSimplifiedTrackObject(value: SimplifiedTrackObject): SimplifiedTrackObject {
    const expectedObj: SimplifiedTrackObject = expect.any(Object)
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

export function testTrackObject(value: TrackObject): TrackObject {
    const expectedObj: TrackObject = expect.any(Object)
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}