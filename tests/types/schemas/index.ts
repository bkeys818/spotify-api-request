import type * as requests from '../../../src/requests'
import { JSONSchemaType } from 'ajv'
import { Unwrap } from '../../global'
import {
    albumObject,
    pagingObject,
    simplifiedTrackObject
} from './objects'

export const objDefault = {
    type: 'object',
    additionalProperties: false
} as const

// @ts-expect-error
const returnTypes: {
    [key in keyof typeof requests]: 
        ReturnType<typeof requests[key]> extends Promise<void>
            ? null
            : JSONSchemaType<Unwrap<ReturnType<typeof requests[key]>>>
} = {
    getMultipleAlbums: {
        ...objDefault,
        properties: {
            albums: {
                type: 'array',
                items: {
                    ...albumObject(),
                    nullable: true
                }
            }
        },
        required: ['albums'],
    },
    getAlbum: albumObject(),
    getAlbumTracks: pagingObject<SimplifiedTrackObject>(simplifiedTrackObject)
}

export default returnTypes