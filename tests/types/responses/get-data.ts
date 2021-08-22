import { config } from 'dotenv'
config()
import authorize from '../../../authorize'
import * as requests from '../../../src/requests'
import { writeFileSync } from 'fs'
import {
    Unwrap,
    params as _params,
    dataPath,
} from '../../global'

// @ts-ignore
const params: {
    [key in keyof typeof requests]: 
        Unwrap<ReturnType<typeof requests[key]>> extends void
            ? null
            : Parameters<typeof requests[key]>
} = {
    ..._params,
    changePlaylistDetails: null,
    followArtistsOrUsers: null,
    followPlaylist: null,
    removeAlbumsforCurrentUser: null,
    removeUsersSavedEpisodes: null,
    saveAlbumsforCurrentUser: null,
    saveEpisodesforUser: null,
    saveShowsforCurrentUser: null,
    saveTracksforUser: null,
    unfollowArtistsOrUsers: null,
    unfollowPlaylist: null,
    uploadCustomPlaylistCoverImage: null
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
            responses[key] = param
        }
    }
    writeFileSync(dataPath, JSON.stringify(responses))
}

getData()