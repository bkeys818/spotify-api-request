import {
    AlbumObject,
    RestrictionObject,
    ArtistObject,
    AudioAnalysisObject,
    AudioFeaturesObject,
    CategoryObject,
    ContextObject,
    CopyrightObject,
    // CurrentlyPlayingContextObject,
    // CurrentlyPlayingObject,
    CursorObject,
    CursorPagingObject,
    // DeviceObject,
    // DisallowsObject,
    EpisodeObject,
    ExplicitContentSettingsObject,
    ExternalIdObject,
    ExternalUrlObject,
    FollowersObject,
    ImageObject,
    LinkedTrackObject,
    PagingObject,
    // PlayHistoryObject,
    // PlayerErrorObject,
    PlaylistObject,
    PlaylistTrackObject,
    PlaylistTracksRefObject,
    PrivateUserObject,
    PublicUserObject,
    RecommendationSeedObject,
    RecommendationsObject,
    SavedAlbumObject,
    SavedEpisodeObject,
    SavedShowObject,
    SavedTrackObject,
    ShowObject,
    SimplifiedAlbumObject,
    SimplifiedArtistObject,
    SimplifiedEpisodeObject,
    SimplifiedPlaylistObject,
    SimplifiedShowObject,
    SimplifiedTrackObject,
    TrackObject,
    // TuneableTrackObject,
} from '../src/objects'
import { urlBase, endpoints, Endpoint } from '../src/objects'

// prettier-ignore
type ConstructorConverter<T extends BooleanConstructor | NumberConstructor | StringConstructor> = 
    T extends BooleanConstructor ? boolean
    : T extends NumberConstructor ? number
    : T extends StringConstructor ? string
    : never

/** Same as {@link expect.any} but checks type */
export const any = <
    T extends BooleanConstructor | NumberConstructor | StringConstructor
>(
    classType: T
): ConstructorConverter<T> => expect.any(classType)

export function arrayOf<
    T extends BooleanConstructor | NumberConstructor | StringConstructor
>(value: ConstructorConverter<T>[], type: T): ConstructorConverter<T>[] {
    return value.length == 0
        ? []
        : expect.arrayContaining<T>([expect.any(type)])
}

export function url(endpoint: Endpoint) {
    let source = `${urlBase}${endpoints[endpoint]}`
    source = source
        .replace(/\//g, '\\/')
        .replace(/\./g, '\\.')
        .replace('{id}', '[a-z\\d]+')
    source += '(\\?.+)?'
    return expect.stringMatching(new RegExp(source, 'i'))
}

export function albumObject(value: AlbumObject): AlbumObject {
    return {
        ...simplifiedAlbumObject(value),
        copyrights: value.copyrights.map(copyrightObject),
        external_ids: externalIdObject(value.external_ids),
        genres: arrayOf(value.genres, String),
        label: any(String),
        popularity: any(Number),
        tracks: pagingObject({
            value: value.tracks,
            endpoint: 'album’s tracks',
            testObj: simplifiedTrackObject,
        }),
    }
}

function restrictionObject(): RestrictionObject {
    return {
        reason: expect.stringMatching(/market|product|explicit/),
    }
}

export function artistObject(value: ArtistObject): ArtistObject {
    return {
        ...simplifiedArtistObject(),
        followers: followersObject(),
        genres: arrayOf(value.genres, String),
        images: value.images.map(imageObject),
        popularity: any(Number),
    }
}

export function audioAnalysisObject(
    value: AudioAnalysisObject
): AudioAnalysisObject {
    return {
        meta: {
            analyzer_version: expect.stringMatching(/\d+\.\d+\.\d+/),
            platform: any(String),
            detailed_status: any(String),
            status_code: any(Number),
            timestamp: any(Number),
            analysis_time: any(Number),
            input_process: any(String),
        },
        track: {
            num_samples: any(Number),
            duration: any(Number),
            sample_md5: any(String),
            offset_seconds: any(Number),
            window_seconds: any(Number),
            analysis_sample_rate: any(Number),
            analysis_channels: any(Number),
            end_of_fade_in: any(Number),
            start_of_fade_out: any(Number),
            loudness: any(Number),
            tempo: any(Number),
            tempo_confidence: any(Number),
            time_signature: any(Number),
            time_signature_confidence: any(Number),
            key: any(Number),
            key_confidence: any(Number),
            mode: any(Number),
            mode_confidence: any(Number),
            codestring: any(String),
            code_version: any(Number),
            echoprintstring: any(String),
            echoprint_version: any(Number),
            synchstring: any(String),
            synch_version: any(Number),
            rhythmstring: any(String),
            rhythm_version: any(Number),
        },
        bars: value.bars.map(() => ({
            start: any(Number),
            duration: any(Number),
            confidence: any(Number),
        })),
        beats: value.beats.map(() => ({
            start: any(Number),
            duration: any(Number),
            confidence: any(Number),
        })),
        sections: value.sections.map(() => ({
            start: any(Number),
            duration: any(Number),
            confidence: any(Number),
            loudness: any(Number),
            tempo: any(Number),
            tempo_confidence: any(Number),
            key: any(Number),
            key_confidence: any(Number),
            mode: any(Number),
            mode_confidence: any(Number),
            time_signature: any(Number),
            time_signature_confidence: any(Number),
        })),
        segments: value.segments.map((segment) => ({
            start: any(Number),
            duration: any(Number),
            confidence: any(Number),
            loudness_start: any(Number),
            loudness_max_time: any(Number),
            loudness_max: any(Number),
            loudness_end: any(Number),
            pitches: arrayOf(segment.pitches, Number),
            timbre: arrayOf(segment.timbre, Number),
        })),
        tatums: value.tatums.map(() => ({
            start: any(Number),
            duration: any(Number),
            confidence: any(Number),
        })),
    }
}

export function audioFeaturesObject(): AudioFeaturesObject {
    return {
        acousticness: any(Number),
        analysis_url: any(String),
        danceability: any(Number),
        duration_ms: any(Number),
        energy: any(Number),
        id: any(String),
        instrumentalness: any(Number),
        key: any(Number),
        liveness: any(Number),
        loudness: any(Number),
        mode: any(Number),
        speechiness: any(Number),
        tempo: any(Number),
        time_signature: any(Number),
        track_href: url('tracks'),
        type: 'audio_features',
        uri: any(String),
        valence: any(Number),
    }
}

export function categoryObject(value: CategoryObject): CategoryObject {
    return {
        href: url('categories'),
        icons: value.icons.map(imageObject),
        id: any(String),
        name: any(String),
    }
}

// prettier-ignore
type ContextObjectType = 'artist' | 'playlist' | 'album' | 'track' | 'show' | 'episode'
function contextObject<T extends ContextObjectType>(type: T): ContextObject<T> {
    return {
        type: type,
        href: url(`${type}s`),
        external_urls: externalUrlObject(),
        uri: any(String),
    }
}

function copyrightObject(): CopyrightObject {
    return {
        text: any(String),
        type: expect.stringMatching(/C|P/),
    }
}

// function currentlyPlayingContextObject(value: CurrentlyPlayingContextObject): CurrentlyPlayingContextObject {}

// function currentlyPlayingObject(value: CurrentlyPlayingObject): CurrentlyPlayingObject {}

function cursorObject(value: CursorObject): CursorObject {
    return {
        after: value.after === null ? null : any(String),
    }
}

export function cursorPagingObject<
    T extends AlbumObject | ArtistObject,
    E extends Endpoint
>(props: {
    value: CursorPagingObject<T, E>
    endpoint: E
    testObj: (() => T) | ((value: T) => T)
}): CursorPagingObject<T, E> {
    const { offset, previous, ...otherProps } = pagingObject({
        value: {
            ...props.value,
            offset: 0,
            previous: null
        },
        endpoint: props.endpoint,
        testObj: props.testObj,
    })
    return {
        ...otherProps,
        cursors: cursorObject(props.value.cursors),
    }
}

// function deviceObject(value: DeviceObject): DeviceObject {}

// function disallowsObject(value: DisallowsObject): DisallowsObject {}

export function episodeObject(value: EpisodeObject): EpisodeObject {
    return {
        ...simplifiedEpisodeObject(value),
        show: simplifiedShowObject(value.show),
        uri: any(String),
    }
}

// function errorObject(value: ErrorObject): ErrorObject {}

function explicitContentSettingsObject(): ExplicitContentSettingsObject {
    return {
        filter_enabled: any(Boolean),
        filter_locked: any(Boolean),
    }
}

function externalIdObject(value: ExternalIdObject): ExternalIdObject {
    const expectedObj: ExternalIdObject = {}
    if ('ean' in value && value.ean) expectedObj.ean = any(String)
    if ('isrc' in value && value.isrc) expectedObj.isrc = any(String)
    if ('upc' in value && value.upc) expectedObj.upc = any(String)
    return expectedObj
}

function externalUrlObject(): ExternalUrlObject {
    return {
        spotify: any(String),
    }
}

function followersObject(): FollowersObject {
    return {
        href: null,
        total: any(Number),
    }
}

export function imageObject(value: ImageObject): ImageObject {
    const expectedObj: ImageObject = {
        url: any(String),
        height: value.height ? any(Number) : null,
        width: value.width ? any(Number) : null,
    }
    return expectedObj
}

function linkedTrackObject(): LinkedTrackObject {
    return {
        external_urls: externalUrlObject(),
        href: url('tracks'),
        id: any(String),
        type: 'track',
        uri: any(String),
    }
}

export function pagingObject<T, E extends Endpoint>(params: {
    value: PagingObject<T, E>
    endpoint: E
    testObj: (() => T) | ((value: T) => T)
}): PagingObject<T, E> {
    const expectUrl = url(params.endpoint)
    return {
        href: expectUrl,
        items: params.value.items.map(params.testObj),
        limit: any(Number),
        next: params.value.next ? expectUrl : null,
        offset: any(Number),
        previous: params.value.previous ? expectUrl : null,
        total: any(Number),
    }
}

// function playHistoryObject(value: PlayHistoryObject): PlayHistoryObject {}

// function playerErrorObject(value: PlayerErrorObject): PlayerErrorObject {}

export function playlistObject(value: PlaylistObject): PlaylistObject {
    return {
        // @ts-ignore
        ...simplifiedPlaylistObject(value),
        followers: followersObject(),
        tracks: pagingObject({
            value: value.tracks,
            endpoint: 'playlist’s tracks',
            testObj: playlistTrackObject,
        }),
    }
}

export function playlistTrackObject(
    value: PlaylistTrackObject
): PlaylistTrackObject {
    let added_by: typeof value.added_by
    if (value.added_by === null) added_by = null
    else 
        added_by = (() => {
            const { display_name, followers, ...returnValue } =
            publicUserObject(
                value.added_by as Parameters<typeof publicUserObject>[0]
            )
            return returnValue
        })()
    return {
        added_at: value.added_at ? any(String) : null,
        added_by: added_by,
        is_local: any(Boolean),
        track: trackObject(value.track),
        primary_color: null,
        video_thumbnail: {
            url: null,
        },
    }
}

function playlistTracksRefObject(): PlaylistTracksRefObject {
    return {
        href: url('playlist’s tracks'),
        total: any(Number),
    }
}

export function privateUserObject(value: PrivateUserObject): PrivateUserObject {
    return {
        ...publicUserObject(value),
        explicit_content: explicitContentSettingsObject(),
        country: any(String),
        email: value.email ? any(String) : null,
        product: any(String),
    }
}

export function publicUserObject(value: PublicUserObject): PublicUserObject {
    const expectedObj: PublicUserObject = {
        display_name: value.display_name === null ? null : any(String),
        external_urls: externalUrlObject(),
        followers: followersObject(),
        href: url('users'),
        id: any(String),
        type: 'user',
        uri: any(String),
    }

    if (value.images) expectedObj.images = value.images.map(imageObject)

    return expectedObj
}

function recommendationSeedObject<T extends 'ARTIST' | 'TRACK' | 'GENRE'>(
    type: T
): RecommendationSeedObject<T> {
    return {
        afterFilteringSize: any(Number),
        afterRelinkingSize: any(Number),
        href: (() => {
            const _type: 'ARTIST' | 'TRACK' | 'GENRE' = type
            if (_type == 'GENRE') return null
            else return url(`${_type.toLowerCase() as Lowercase<typeof _type>}s`)
        })(),
        id: any(String),
        initialPoolSize: any(Number),
        type: type,
    }
}

export function recommendationsObject(
    value: RecommendationsObject
): RecommendationsObject {
    return {
        seeds: value.seeds.map((seed) =>
            recommendationSeedObject(seed.type)
        ) as RecommendationsObject['seeds'],
        tracks: value.tracks.map(trackObject),
    }
}

type SavedObject = SavedAlbumObject | SavedEpisodeObject | SavedShowObject | SavedTrackObject
export function savedObject<T extends SavedObject>(value: T): T {
    const obj: { [key: string]: any } = { added_at: any(String) }
    if ('album' in value && value.album) obj.album = albumObject(value.album)
    else if ('episode' in value && value.episode) obj.episode = episodeObject(value.episode)
    else if ('show' in value && value.show) obj.show = simplifiedShowObject(value.show)
    else if ('track' in value && value.track) obj.track = trackObject(value.track)
    return obj as T
}

export function showObject(value: ShowObject): ShowObject {
    return {
        ...simplifiedShowObject(value),
        episodes: pagingObject({
            value: value.episodes,
            endpoint: 'show’s episodes',
            testObj: simplifiedEpisodeObject
        }),
    }
}

export function simplifiedAlbumObject(
    value: SimplifiedAlbumObject
): SimplifiedAlbumObject {
    const obj: SimplifiedAlbumObject = {
        ...contextObject('album'),
        album_type: expect.stringMatching(/album|single|compilation/i),
        artists: value.artists.map(simplifiedArtistObject),
        available_markets: arrayOf(value.available_markets, String),
        id: any(String),
        images: value.images.map(imageObject),
        name: any(String),
        release_date: expect.stringMatching(/\d{4}(-\d{2}(-\d{2})?)?/),
        release_date_precision: expect.stringMatching(/year|month|day/),
        total_tracks: any(Number),
    }

    if ('album_group' in value)
        obj.album_group = expect.stringMatching(
            /album|single|compilation|appears_on/
        )

    if ('restrictions' in value) obj.restrictions = restrictionObject()

    return obj
}

export function simplifiedArtistObject(): SimplifiedArtistObject {
    return {
        ...contextObject('artist'),
        id: any(String),
        name: any(String),
    }
}

export function simplifiedEpisodeObject(
    value: SimplifiedEpisodeObject
): SimplifiedEpisodeObject {
    const obj: SimplifiedEpisodeObject = {
        ...contextObject('episode'),
        audio_preview_url: value.audio_preview_url ? any(String) : null,
        description: any(String),
        duration_ms: any(Number),
        explicit: any(Boolean),
        html_description: any(String),
        id: any(String),
        images: value.images.map(imageObject),
        is_externally_hosted: any(Boolean),
        is_playable: any(Boolean),
        language: any(String),
        name: any(String),
        release_date: any(String),
        release_date_precision: expect.stringMatching(/year|month|day/),
    }

    if (value.resume_point)
        obj.resume_point = {
            fully_played: any(Boolean),
            resume_position_ms: any(Number),
        }

    if (value.languages) obj.languages = arrayOf(value.languages, String)

    return obj
}

/** @internal */
export function _simplifiedPlaylistObject(
    value: Omit<SimplifiedPlaylistObject, 'tracks'>
): Omit<SimplifiedPlaylistObject, 'tracks'> {
    return {
        ...contextObject('playlist'),
        collaborative: any(Boolean),
        description: value.description === null ? null : any(String),
        id: any(String),
        images: value.images.map(imageObject),
        name: any(String),
        owner: (() => {
            let publicUser: PublicUserObject = {
                ...value.owner,
                followers: expect.any(Object),
            }
            publicUser = publicUserObject(publicUser)
            const { followers, ...otherProps } = publicUser
            return otherProps
        })(),
        public: value.public === null ? null : any(Boolean),
        snapshot_id: any(String),
        primary_color: null,
    }
}

export function simplifiedPlaylistObject(
    value: SimplifiedPlaylistObject
): SimplifiedPlaylistObject {
    return {
        ..._simplifiedPlaylistObject(value),
        tracks: value.tracks ? playlistTracksRefObject() : null,
    }
}

export function simplifiedShowObject(
    value: SimplifiedShowObject
): SimplifiedShowObject {
    return {
        ...contextObject('show'),
        available_markets: arrayOf(value.available_markets, String),
        copyrights: value.copyrights.map(copyrightObject),
        description: any(String),
        explicit: any(Boolean),
        html_description: any(String),
        id: any(String),
        images: value.images.map(imageObject),
        is_externally_hosted: value.is_externally_hosted === null ? null : any(Boolean),
        languages: arrayOf(value.languages, String),
        media_type: any(String),
        name: any(String),
        publisher: any(String),
        total_episodes: any(Number),
    }
}

export function simplifiedTrackObject(
    value: SimplifiedTrackObject
): SimplifiedTrackObject {
    const obj: SimplifiedTrackObject = {
        ...contextObject('track'),
        artists: value.artists.map(simplifiedArtistObject),
        available_markets: arrayOf(value.available_markets, String),
        disc_number: any(Number),
        duration_ms: any(Number),
        explicit: any(Boolean),
        id: any(String),
        is_local: any(Boolean),
        name: any(String),
        preview_url: value.preview_url ? any(String) : null,
        track_number: any(Number),
    }

    if ('is_playable' in value) obj.is_playable = any(Boolean)

    if ('linked_from' in value) obj.linked_from = linkedTrackObject()

    if ('restrictions' in value) obj.restrictions = restrictionObject()

    return obj
}

export function trackObject(value: TrackObject): TrackObject {
    const obj: TrackObject = {
        ...simplifiedTrackObject(value),
        album: simplifiedAlbumObject(value.album),
        external_ids: externalIdObject(value.external_ids),
        popularity: any(Number),
    }

    if ('episode' in value) obj.episode = any(Boolean)
    if ('track' in value) obj.track = any(Boolean)

    return obj
}

// function tuneableTrackObject(value: TuneableTrackObject): TuneableTrackObject {}
