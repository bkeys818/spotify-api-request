import { JSONSchemaType } from 'ajv'
import { objDefault } from '.'

const availableMarkets = { type: 'array', items: { type: 'string', pattern: '[a-zA-Z]{2}' } } as const

export function albumObject(): JSONSchemaType<AlbumObject> {
    return {
        ...objDefault,
        properties: {
            ...simplifiedAlbumObject().properties,
            copyrights: { type: 'array', items: copyrightObject() },
            external_ids: externalIdObject(),
            genres: { type: 'array', items: { type: 'string' } },
            label: { type: 'string' },
            popularity: { type: 'integer' },
            tracks: pagingObject<SimplifiedTrackObject>(simplifiedTrackObject)
        },
        required: [
            ...simplifiedAlbumObject().required,
            'copyrights',
            'external_ids',
            'genres',
            'label',
            'popularity',
        ]
    }
}

function restrictionObject(): JSONSchemaType<RestrictionObject> {
    return {
        ...objDefault,
        properties: { reason: { type: 'string' } },
        required: ['reason']
    }
}

// function artistObject(): JSONSchemaType<ArtistObject> {
//     return {

//     }
// }

// function audioAnalysisObject(): JSONSchemaType<AudioAnalysisObject> {
//     return {

//     }
// }

// function audioFeaturesObject(): JSONSchemaType<AudioFeaturesObject> {
//     return {

//     }
// }

// function categoryObject(): JSONSchemaType<CategoryObject> {
//     return {

//     }
// }

function externalUrlObject(): JSONSchemaType<ExternalUrlObject> {
    return {
        ...objDefault,
        properties: {
            spotify: { type: 'string' },
        },
        required: ['spotify'],
    }
}

type ContextType =
    | 'artist'
    | 'playlist'
    | 'album'
    | 'track'
    | 'show'
    | 'episode'
function contextObject(
    type: ContextType
): JSONSchemaType<ContextObject<ContextType>> {
    return {
        ...objDefault,
        properties: {
            type: { type: 'string', const: type },
            href: { type: 'string', },
            external_urls: externalUrlObject(),
            uri: { type: 'string' },
        },
        required: ['type', 'href', 'external_urls', 'uri'],
    }
}

function copyrightObject(): JSONSchemaType<CopyrightObject> {
    return {
        ...objDefault,
        properties: {
            text: { type: 'string' },
            type: { type: 'string', enum: ['C', 'P'] }
        },
        required: ['text', 'type']
    }
}

// function currentlyPlayingContextObject(): JSONSchemaType<CurrentlyPlayingContextObject> {
//     return {

//     }
// }

// function currentlyPlayingObject(): JSONSchemaType<CurrentlyPlayingObject> {
//     return {

//     }
// }

// function cursorObject(): JSONSchemaType<CursorObject> {
//     return {

//     }
// }

// function cursorPagingObject(): JSONSchemaType<CursorPagingObject> {
//     return {

//     }
// }

// function deviceObject(): JSONSchemaType<DeviceObject> {
//     return {

//     }
// }

// function disallowsObject(): JSONSchemaType<DisallowsObject> {
//     return {

//     }
// }

// function episodeObject(): JSONSchemaType<EpisodeObject> {
//     return {

//     }
// }

// function errorObject(): JSONSchemaType<ErrorObject> {
//     return {

//     }
// }

// function explicitContentSettingsObject(): JSONSchemaType<ExplicitContentSettingsObject> {
//     return {

//     }
// }

function externalIdObject(): JSONSchemaType<ExternalIdObject> {
    return {
        ...objDefault,
        type: 'object',
        properties: {
            isrc: { type: 'string', nullable: true },
            ean: { type: 'string', nullable: true },
            upc: { type: 'string', nullable: true }
        },
    }
}

// function followersObject(): JSONSchemaType<FollowersObject> {
//     return {

//     }
// }

function imageObject(): JSONSchemaType<ImageObject> {
    return {
        ...objDefault,
        properties: {
            height: { type: 'number', nullable: true },
            width: { type: 'number', nullable: true },
            url: { type: 'string', },
        },
        required: ['url'],
    }
}

// function linkedTrackObject(): JSONSchemaType<LinkedTrackObject> {
//     return {

//     }
// }

export function pagingObject<T>(itemSchema: () => JSONSchemaType<T>): JSONSchemaType<PagingObject<T>> {
    return {
        ...objDefault,
        properties: {
            href: { type: 'string', },
            items: { type: 'array', items: itemSchema() },
            limit: { type: 'integer' },
            next: { type: 'string', nullable: true },
            offset: { type: 'integer' },
            previous: { type: 'string', nullable: true },
            total: { type: 'integer' },
        },
        required: [
            'href',
            'items',
            'limit',
            'next',
            'offset',
            'previous',
            'total',
        ]
    }
}

// function playHistoryObject(): JSONSchemaType<PlayHistoryObject> {
//     return {

//     }
// }

// function playerErrorObject(): JSONSchemaType<PlayerErrorObject> {
//     return {

//     }
// }

// function playlistObject(): JSONSchemaType<PlaylistObject> {
//     return {

//     }
// }

// function playlistTrackObject(): JSONSchemaType<PlaylistTrackObject> {
//     return {

//     }
// }

// function playlistTracksRefObject(): JSONSchemaType<PlaylistTracksRefObject> {
//     return {

//     }
// }

// function privateUserObject(): JSONSchemaType<PrivateUserObject> {
//     return {

//     }
// }

// function publicUserObject(): JSONSchemaType<PublicUserObject> {
//     return {

//     }
// }

// function recommendationSeedObject(): JSONSchemaType<RecommendationSeedObject> {
//     return {

//     }
// }

// function recommendationsObject(): JSONSchemaType<RecommendationsObject> {
//     return {

//     }
// }

// function resumePointObject(): JSONSchemaType<ResumePointObject> {
//     return {

//     }
// }

// function savedAlbumObject(): JSONSchemaType<SavedAlbumObject> {
//     return {

//     }
// }

// function savedEpisodeObject(): JSONSchemaType<SavedEpisodeObject> {
//     return {

//     }
// }

// function savedShowObject(): JSONSchemaType<SavedShowObject> {
//     return {

//     }
// }

// function savedTrackObject(): JSONSchemaType<SavedTrackObject> {
//     return {

//     }
// }

// function showObject(): JSONSchemaType<ShowObject> {
//     return {

//     }
// }

function simplifiedAlbumObject(): JSONSchemaType<SimplifiedAlbumObject> {
    return {
        ...objDefault,
        properties: {
            ...contextObject('album').properties,
            album_group: { type: 'string', enum: ['album', 'single', 'compilation', 'appears_on'] },
            album_type: { type: 'string', enum: ['album', 'single', 'compilation'] },
            artists: { type: 'array', items: simplifiedArtistObject() },
            available_markets: availableMarkets,
            id: { type: 'string' },
            images: { type: 'array', items: imageObject() },
            name: { type: 'string' },
            release_date:  { type: 'string' },
            release_date_precision: { type: 'string', enum: ['year', 'month', 'day'] },
            restrictions: restrictionObject(),
            total_tracks: { type: 'integer' },
        },
        required: [
            ...contextObject('album').required,
            'album_type',
            'artists',
            'id',
            'images',
            'name',
            'release_date',
            'release_date_precision',
            'total_tracks'
        ],
    }
}

function simplifiedArtistObject(): JSONSchemaType<SimplifiedArtistObject> {
    return {
        ...objDefault,
        properties: {
            ...contextObject('artist').properties,
            id: { type: 'string' },
            name: { type: 'string' },
        },
        required: [
            ...contextObject('artist').required,
            'id',
            'name'
        ],
    }
}

// function simplifiedEpisodeObject(): JSONSchemaType<SimplifiedEpisodeObject> {
//     return {

//     }
// }

// function simplifiedPlaylistObject(): JSONSchemaType<SimplifiedPlaylistObject> {
//     return {

//     }
// }

// function simplifiedShowObject(): JSONSchemaType<SimplifiedShowObject> {
//     return {

//     }
// }

export function simplifiedTrackObject(): JSONSchemaType<SimplifiedTrackObject> {
    return {
        ...objDefault,
        properties: {
            ...contextObject('track').properties,
            artists: { type: 'array', items: simplifiedArtistObject() },
            available_markets: availableMarkets,
            disc_number: { type: 'integer' },
            duration_ms: { type: 'number' },
            explicit: { type: 'boolean' },
            id: { type: 'string' },
            is_local: { type: 'boolean' },
            is_playable: { type: 'boolean' },
            linked_from: { type: 'object' },
            name: { type: 'string' },
            preview_url: { type: 'string', },
            restrictions: restrictionObject(),
            track_number: { type: 'integer' },
        },
        required: [
            ...contextObject('track').required,
            'artists',
            'disc_number',
            'duration_ms',
            'explicit',
            'id',
            'is_local',
            'name',
            'preview_url',
            'track_number',
        ],
    }
}

// function trackObject(): JSONSchemaType<TrackObject> {
//     return {

//     }
// }

// function tuneableTrackObject(): JSONSchemaType<TuneableTrackObject> {
//     return {

//     }
// }
