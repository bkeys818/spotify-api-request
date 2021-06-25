import {} from '../../src/api/artists'
import { SimplifiedArtistObject } from '../../src/api/objects'
import { contextObject } from './global'

export const testSimplifiedArtistObject: SimplifiedArtistObject = {
    ...contextObject('artist'),
    id: expect.any(String),
    name: expect.any(String),
}
