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
} from '../../src/api/objects'
import { HasEndpoint } from '../../src/api/objects'

type ConstructorConverter<T extends BooleanConstructor | NumberConstructor | StringConstructor> = 
    T extends BooleanConstructor ? boolean
    : T extends NumberConstructor ? number
    : T extends StringConstructor ? string
    : never
export function arrayOf<T extends BooleanConstructor | NumberConstructor | StringConstructor>(
    value: ConstructorConverter<T>[],
    type: T
): ConstructorConverter<T>[] {
    return value.length == 0 ? [] : expect.arrayContaining<T>([expect.any(type)]);
}
    

export function url(endpoint: RegExp, includeQuery = false) {
    let source = /https:\/\/api\.spotify\.com\/v1\//.source + endpoint.source
    if (includeQuery) source += '(\\?.+)?'
    return expect.stringMatching(new RegExp(source, 'i'))
}

export function albumObject(value: AlbumObject): AlbumObject {
    return {
        ...simplifiedAlbumObject(value),
        copyrights: value.copyrights.map(copyrightObject),
        external_ids: externalIdObject(value.external_ids),
        genres: arrayOf(value.genres, String),
        label: expect.any(String),
        popularity: expect.any(Number),
        tracks: pagingObject({
            value: value.tracks,
            url: url(/albums\/[a-z\d]+\/tracks/, true),
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
        popularity: expect.any(String),
    }
}

export function audioAnalysisObject(
    value: AudioAnalysisObject
): AudioAnalysisObject {
    return {
        meta: {
            analyzer_version: expect.stringMatching(/\d+\.\d+\.\d+/),
            platform: expect.any(String),
            detailed_status: expect.any(String),
            status_code: expect.any(Number),
            timestamp: expect.any(Number),
            analysis_time: expect.any(Number),
            input_process: expect.any(String),
        },
        track: {
            num_samples: expect.any(Number),
            duration: expect.any(Number),
            sample_md5: expect.any(String),
            offset_seconds: expect.any(Number),
            window_seconds: expect.any(Number),
            analysis_sample_rate: expect.any(Number),
            analysis_channels: expect.any(Number),
            end_of_fade_in: expect.any(Number),
            start_of_fade_out: expect.any(Number),
            loudness: expect.any(Number),
            tempo: expect.any(Number),
            tempo_confidence: expect.any(Number),
            time_signature: expect.any(Number),
            time_signature_confidence: expect.any(Number),
            key: expect.any(Number),
            key_confidence: expect.any(Number),
            mode: expect.any(Number),
            mode_confidence: expect.any(Number),
            codestring: expect.any(String),
            code_version: expect.any(Number),
            echoprintstring: expect.any(String),
            echoprint_version: expect.any(Number),
            synchstring: expect.any(String),
            synch_version: expect.any(Number),
            rhythmstring: expect.any(String),
            rhythm_version: expect.any(Number),
        },
        bars: value.bars.map(() => ({
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
        })),
        beats: value.beats.map(() => ({
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
        })),
        sections: value.sections.map(() => ({
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
            loudness: expect.any(Number),
            tempo: expect.any(Number),
            tempo_confidence: expect.any(Number),
            key: expect.any(Number),
            key_confidence: expect.any(Number),
            mode: expect.any(Number),
            mode_confidence: expect.any(Number),
            time_signature: expect.any(Number),
            time_signature_confidence: expect.any(Number),
        })),
        segments: value.segments.map((segment) => ({
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
            loudness_start: expect.any(Number),
            loudness_max_time: expect.any(Number),
            loudness_max: expect.any(Number),
            loudness_end: expect.any(Number),
            pitches: arrayOf(segment.pitches, Number),
            timbre: arrayOf(segment.timbre, Number),
        })),
        tatums: value.sections.map(() => ({
            start: expect.any(Number),
            duration: expect.any(Number),
            confidence: expect.any(Number),
        })),
    }
}

export function audioFeaturesObject(): AudioFeaturesObject {
    return {
        acousticness: expect.any(Number),
        analysis_url: expect.any(String),
        danceability: expect.any(Number),
        duration_ms: expect.any(Number),
        energy: expect.any(Number),
        id: expect.any(String),
        instrumentalness: expect.any(Number),
        key: expect.any(Number),
        liveness: expect.any(Number),
        loudness: expect.any(Number),
        mode: expect.any(Number),
        speechiness: expect.any(Number),
        tempo: expect.any(Number),
        time_signature: expect.any(Number),
        track_href: url(/tracks\/[a-z\d]+/),
        type: 'audio_features',
        uri: expect.any(String),
        valence: expect.any(Number),
    }
}

export function categoryObject(value: CategoryObject): CategoryObject {
    return {
        href: url(/browse\/categories\/[a-z\d]+/),
        icons: value.icons.map(imageObject),
        id: expect.any(String),
        name: expect.any(String),
    }
}

// prettier-ignore
type ContextObjectType = 'artist' | 'playlist' | 'album' | 'track' | 'show' | 'episode'
function contextObject<T extends ContextObjectType>(type: T): ContextObject<T> {
    return {
        type: type,
        href: url(new RegExp(`${type}s\\/[a-z\\d]+`)),
        external_urls: externalUrlObject(),
        uri: expect.any(String),
    }
}

function copyrightObject(): CopyrightObject {
    return {
        text: expect.any(String),
        type: expect.stringMatching(/C|P/),
    }
}

// function currentlyPlayingContextObject(value: CurrentlyPlayingContextObject): CurrentlyPlayingContextObject {}

// function currentlyPlayingObject(value: CurrentlyPlayingObject): CurrentlyPlayingObject {}

function cursorObject(): CursorObject {
    return {
        after: expect.any(String),
    }
}

export function cursorPagingObject<T extends AlbumObject | ArtistObject>(props: {
    value: CursorPagingObject<T>
    url: CursorPagingObject<T>['href']
    testObj: (() => T) | ((value: T) => T)
}): CursorPagingObject<T> {
    return {
        ...pagingObject(props),
        cursors: cursorObject(),
    }
}

// function deviceObject(value: DeviceObject): DeviceObject {}

// function disallowsObject(value: DisallowsObject): DisallowsObject {}

export function episodeObject(value: EpisodeObject): EpisodeObject {
    return {
        ...simplifiedEpisodeObject(value),
        show: simplifiedShowObject(value.show),
        uri: expect.any(String),
    }
}

// function errorObject(value: ErrorObject): ErrorObject {}

function explicitContentSettingsObject(): ExplicitContentSettingsObject {
    return {
        filter_enabled: expect.any(Boolean),
        filter_locked: expect.any(Boolean),
    }
}

function externalIdObject(value: ExternalIdObject): ExternalIdObject {
    const expectedObj: ExternalIdObject = {}
    if ('ean' in value && value.ean) expectedObj.ean = expect.any(String)
    if ('isrc' in value && value.isrc) expectedObj.isrc = expect.any(String)
    if ('upc' in value && value.upc) expectedObj.upc = expect.any(String)
    return expectedObj
}

function externalUrlObject(): ExternalUrlObject {
    return {
        spotify: expect.any(String),
    }
}

function followersObject(): FollowersObject {
    return {
        href: null,
        total: expect.any(Number),
    }
}

export function imageObject(value: ImageObject): ImageObject {
    const expectedObj: ImageObject = {
        url: expect.any(String),
    }
    if (value.height) expectedObj.height = expect.any(Number)
    if (value.width) expectedObj.width = expect.any(Number)
    return expectedObj
}

function linkedTrackObject(): LinkedTrackObject {
    return {
        external_urls: externalUrlObject(),
        href: url(/tracks\/[a-z\d]+/),
        id: expect.any(String),
        type: 'track',
        uri: expect.any(String),
    }
}

export function pagingObject<T extends HasEndpoint>(params: {
    value: PagingObject<T>
    url: PagingObject<T>['href']
    testObj: (() => T) | ((value: T) => T)
}): PagingObject<T> {
    return {
        href: params.url,
        items: params.value.items.map(params.testObj),
        limit: expect.any(Number),
        next: params.value.next ? params.url : null,
        offset: expect.any(Number),
        previous: params.value.previous ? params.url : null,
        total: expect.any(Number),
    }
}

// function playHistoryObject(value: PlayHistoryObject): PlayHistoryObject {}

// function playerErrorObject(value: PlayerErrorObject): PlayerErrorObject {}

export function playlistObject(value: PlaylistObject): PlaylistObject {
    return {
        // @ts-ignore
        ...simplifiedPlaylistObject(value),
        followers: followersObject(),
        tracks: pagingObject<PlaylistTrackObject>({
            value: value.tracks,
            url: url(/playlists\/[a-z\d]+\/tracks/, true),
            testObj: playlistTrackObject,
        }),
    }
}

export function playlistTrackObject(value: PlaylistTrackObject): PlaylistTrackObject {
    return {
        added_at: value.added_at ? expect.any(Number) : null,
        added_by: value.added_by ? publicUserObject(value.added_by) : null,
        is_local: expect.any(Boolean),
        track: trackObject(value.track),
        primary_color: null,
        video_thumbnail: {
            url: null,
        },
    }
}

function playlistTracksRefObject(): PlaylistTracksRefObject {
    return {
        href: url(/playlists\/[a-z\d]+\/tracks/),
        total: expect.any(Number),
    }
}

export function privateUserObject(value: PrivateUserObject): PrivateUserObject {
    return {
        ...publicUserObject(value),
        country: expect.any(String),
        email: value.email ? expect.any(String) : null,
        product: expect.any(String),
    }
}

export function publicUserObject(value: PublicUserObject): PublicUserObject {
    return {
        display_name: expect.any(String),
        explicit_content: explicitContentSettingsObject(),
        external_urls: externalUrlObject(),
        followers: followersObject(),
        href: url(/users\/[a-z\d]+/),
        id: expect.any(String),
        images: value.images.map(imageObject),
        type: 'user',
        uri: expect.any(String),
    }
}

function recommendationSeedObject<T extends 'artist' | 'track' | 'genre'>(
    type: T
): RecommendationSeedObject<T> {
    return {
        afterFilteringSize: expect.any(Number),
        afterRelinkingSize: expect.any(Number),
        href:
            type === 'artist'
                ? url(/artists\/[a-z\d]+/)
                : type === 'track'
                ? url(/tracks\/[a-z\d]+/)
                : null,
        id: expect.any(String),
        initialPoolSize: expect.any(Number),
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
        tracks: value.tracks.map(simplifiedTrackObject),
    }
}

type SavedObject = SavedAlbumObject | SavedShowObject | SavedTrackObject
export function savedObject<T extends SavedObject>(value: T): T {
    const obj: { [key: string]: any } = { added_at: expect.any(Number) }
    if ('album' in value) obj.album = albumObject(value.album)
    if ('show' in value) obj.show = simplifiedShowObject(value.show)
    if ('track' in value) obj.track = trackObject(value.track)
    return obj as T
}

export function showObject(value: ShowObject): ShowObject {
    return {
        ...simplifiedShowObject(value),
        episodes: value.episodes.map(simplifiedEpisodeObject),
    }
}

export function simplifiedAlbumObject(
    value: SimplifiedAlbumObject
): SimplifiedAlbumObject {
    const obj: SimplifiedAlbumObject = {
        ...contextObject('album'),
        album_type: expect.stringMatching(/album|single|compilation/),
        artists: value.artists.map(simplifiedArtistObject),
        available_markets: arrayOf(value.available_markets, String),
        id: expect.any(String),
        images: value.images.map(imageObject),
        name: expect.any(String),
        release_date: expect.stringMatching(/\d{4}(-\d{2}(-\d{2})?)?/),
        release_date_precision: expect.stringMatching(/year|month|day/),
        total_tracks: expect.any(Number),
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
        id: expect.any(String),
        name: expect.any(String),
    }
}

export function simplifiedEpisodeObject(
    value: SimplifiedEpisodeObject
): SimplifiedEpisodeObject {
    const obj: SimplifiedEpisodeObject = {
        ...contextObject('episode'),
        audio_preview_url: value.audio_preview_url ? expect.any(String) : null,
        description: expect.any(String),
        duration_ms: expect.any(Number),
        explicit: expect.any(Boolean),
        html_description: expect.any(String),
        id: expect.any(String),
        images: value.images.map(imageObject),
        is_externally_hosted: expect.any(Boolean),
        is_playable: expect.any(Boolean),
        language: expect.any(String),
        name: expect.any(String),
        release_date: expect.any(String),
        release_date_precision: expect.stringMatching(/year|month|day/),
    }

    if (value.resume_point)
        obj.resume_point = {
            fully_played: expect.any(Boolean),
            resume_position_ms: expect.any(Number),
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
        collaborative: expect.any(Boolean),
        description: value.description ? expect.any(String) : null,
        id: expect.any(String),
        images: value.images.map(imageObject),
        name: expect.any(String),
        owner: publicUserObject(value.owner),
        public: expect.any(Boolean),
        snapshot_id: expect.any(String),
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
        description: expect.any(String),
        explicit: expect.any(Boolean),
        id: expect.any(String),
        images: value.images.map(imageObject),
        is_externally_hosted: value.is_externally_hosted
            ? expect.any(Boolean)
            : null,
        languages: arrayOf(value.languages, String),
        media_type: expect.any(String),
        name: expect.any(String),
        publisher: expect.any(String),
    }
}

export function simplifiedTrackObject(
    value: SimplifiedTrackObject
): SimplifiedTrackObject {
    const obj: SimplifiedTrackObject = {
        ...contextObject('track'),
        artists: value.artists.map(simplifiedArtistObject),
        available_markets: arrayOf(value.available_markets, String),
        disc_number: expect.any(Number),
        duration_ms: expect.any(Number),
        explicit: expect.any(Boolean),
        id: expect.any(String),
        is_local: expect.any(Boolean),
        name: expect.any(String),
        preview_url: value.preview_url ? expect.any(String) : null,
        track_number: expect.any(Number),
    }

    if ('is_playable' in value) obj.is_playable = expect.any(Boolean)

    if ('linked_from' in value) obj.linked_from = linkedTrackObject()

    if ('restrictions' in value) obj.restrictions = restrictionObject()

    return obj
}

export function trackObject(value: TrackObject): TrackObject {
    const obj: TrackObject = {
        ...simplifiedTrackObject(value),
        album: simplifiedAlbumObject(value.album),
        external_ids: externalIdObject(value.external_ids),
        popularity: expect.any(Number),
    }

    if ('episode' in value) obj.episode = expect.any(Boolean)
    if ('track' in value) obj.track = expect.any(Boolean)

    return obj
}

// function tuneableTrackObject(value: TuneableTrackObject): TuneableTrackObject {}
