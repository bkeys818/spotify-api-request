import authorize from '../../../authorize'
import * as requests from '../../../src/requests'
import { writeFileSync } from 'fs'
import {
    Unwrap,
    albumIDs,
    artistIDs,
    categoryIDs,
    episodeIds,
    playlistIDs,
    showIDs,
    trackIds,
    userIDs,
} from '../../global'

import { token } from '../../global';

// @ts-ignore
const params: {
    [key in keyof typeof requests]: 
        Unwrap<ReturnType<typeof requests[key]>> extends void
            ? null
            : Parameters<typeof requests[key]>
} = {
    getMultipleAlbums: [ token, albumIDs ],
    getAlbum: [ token, albumIDs[0] ],
    getAlbumTracks: [ token, albumIDs[0] ],
}

async function getData() {
    await authorize()
    const responses: { [key: string]: any } = {}
    for (const key in params) {
        const request = requests[key as keyof typeof requests]
        const param = params[key as keyof typeof params]
        if (param !== null) {
            // @ts-ignore
            responses[key] = await request(...param)
        } else {
            responses[key] = params
        }
    }
    writeFileSync('tests/types/responses/data.json', JSON.stringify(responses))
}

getData()