/** @internal */
export const urlBase = 'https://api.spotify.com/v1/' as const
/** @internal */
export const endpoints = {
    // albums
    'albums': `albums/{id}` as `albums/${string}`,
    'album’s tracks': `albums/{id}/tracks` as `albums/${string}/tracks`,
    // artists
    'artists': `artists/{id}` as `artists/${string}`,
    'artist’s albums': `artists/{id}/albums` as `artists/${string}/albums`,
    // browse
    'categories': `browse/categories` as `browse/categories`,
    'category’s playlists': `browse/categories/{id}/playlists` as `browse/categories/${string}/playlist`,
    'featured playlists':  `browse/featured-playlists` as const,
    'new releases': `browse/new-releases` as const,
    // episodes
    'episodes' :`episodes/{id}` as `episodes/${string}`,
    // playlists
    'playlists': `playlists/{id}` as `playlists/${string}`,
    'playlist’s tracks': `playlists/{id}/tracks` as `playlists/${string}/tracks`,
    // shows
    'show’s episodes': `shows/{id}/episodes` as `shows/${string}/episodes`,
    'shows': `shows/{id}` as `shows/${string}`,
    // tracks
    'tracks': `tracks/{id}` as `tracks/${string}`,
    // users
    'users': `users/{id}` as `users/${string}`,
    'user’s playlists': `users/{id}/playlist` as `users/${string}/playlist`,
    // search
    'search': `search` as const,
    // library
    'my albums': `me/albums` as const,
    'my episodes': `me/episodes` as const,
    'my shows': `me/shows` as const,
    'my tracks': `me/tracks` as const,
} as const
/** @internal */
type Query = `?${string}` | ''

type UrlBase = typeof urlBase
export type Endpoint = keyof typeof endpoints
type EndpointUrl<E extends Endpoint> = typeof endpoints[E]
type SpotifyUrl<E extends Endpoint> = `${UrlBase}${EndpointUrl<E>}${Query | ''}`


/** [Album Object](https://developer.spotify.com/documentation/web-api/reference/#object-albumobject) */
export interface AlbumObject extends SimplifiedAlbumObject {
    /**
     * The copyright statements of the album.
     */
    copyrights: CopyrightObject[]
    /**
     * Known external IDs for the album.
     */
    external_ids: ExternalIdObject
    /**
     * A list of the genres used to classify the album.
     * For example: `"Prog Rock"` , `"Post-Grunge"`. (If not yet classified, the array is empty.)
     */
    genres: string[]
    /**
     * The label for the album.
     */
    label: string
    /**
     * The popularity of the album. The value will be between `0` and `100`, with `100` being the most popular.
     * The popularity is calculated from the popularity of the album’s individual tracks;
     */
    popularity: number
    /**
     * The tracks of the album.
     */
    tracks: PagingObject<SimplifiedTrackObject, 'album’s tracks'>
}

/** [Album Restriction Object](https://developer.spotify.com/documentation/web-api/reference/#object-albumrestrictionobject) & [Track Restriction Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackrestrictionobject) */
export interface RestrictionObject {
    /**
     * The reason for the restriction.
     *
     * Supported values:
     * - `market` - The content item is not available in the given market.
     * - `product` - The content item is not available for the user’s subscription type.
     * - `explicit` - The content item is explicit and the user’s account is set to not play explicit content.
     *
     * Additional reasons may be added in the future. **Note:** If you use this field, make sure that your application safely handles unknown values.
     */
    reason: string
}

/** [Artist Object](https://developer.spotify.com/documentation/web-api/reference/#object-artistobject) */
export interface ArtistObject extends SimplifiedArtistObject {
    /**
     * Information about the followers of the artist.
     */
    followers: FollowersObject
    /**
     * A list of the genres the artist is associated with.
     * For example: `"Prog Rock"` , `"Post-Grunge"`.
     * (If not yet classified, the array is empty.)
     */
    genres: string[]
    /**
     * Images of the artist in various sizes, widest first.
     */
    images: ImageObject[]
    /**
     * The popularity of the artist. The value will be between `0` and `100`, with `100` being the most popular.
     * The artist’s popularity is calculated from the popularity of all the artist’s tracks.
     */
    popularity: number
}

/** This object is not in the offical Spotify API, but its the response from "Get Audio Analysis for a Track" */
export interface AudioAnalysisObject {
    meta: {
        analyzer_version: `${number}.${number}.${number}`
        platform: string
        detailed_status: string
        status_code: number
        timestamp: number
        analysis_time: number
        input_process: string
    }
    track: {
        num_samples: number
        duration: number
        sample_md5: string
        offset_seconds: number
        window_seconds: number
        analysis_sample_rate: number
        analysis_channels: number
        end_of_fade_in: number
        start_of_fade_out: number
        loudness: number
        tempo: number
        tempo_confidence: number
        time_signature: number
        time_signature_confidence: number
        key: number
        key_confidence: number
        mode: number
        mode_confidence: number
        codestring: string
        code_version: number
        echoprintstring: string
        echoprint_version: number
        synchstring: string
        synch_version: number
        rhythmstring: string
        rhythm_version: number
    }
    bars: {
        start: number
        duration: number
        confidence: number
    }[]
    beats: {
        start: number
        duration: number
        confidence: number
    }[]
    sections: {
        start: number
        duration: number
        confidence: number
        loudness: number
        tempo: number
        tempo_confidence: number
        key: number
        key_confidence: number
        mode: number
        mode_confidence: number
        time_signature: number
        time_signature_confidence: number
    }[]
    segments: {
        start: number
        duration: number
        confidence: number
        loudness_start: number
        loudness_max_time: number
        loudness_max: number
        loudness_end: number
        pitches: number[]
        timbre: number[]
    }[]
    tatums: {
        start: number
        duration: number
        confidence: number
    }[]
}

/** [Audio Features Object](https://developer.spotify.com/documentation/web-api/reference/#object-audiofeaturesobject) */
export interface AudioFeaturesObject {
    /**
     * A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
     * @type Float
     */
    acousticness: number
    /** An HTTP URL to access the full audio analysis of this track. An access token is required to access this data. */
    analysis_url: string
    /**
     * Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
     * @type Float
     */
    danceability: number
    /**
     * The duration of the track in milliseconds.
     * @type Integer
     */
    duration_ms: number
    /**
     * Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
     * @type Float
     */
    energy: number
    /** The Spotify ID for the track. */
    id: string
    /**
     * Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
     * @type Float
     */
    instrumentalness: number
    /**
     * The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.
     * @type Integer
     */
    key: number
    /**
     * Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
     * @type Float
     */
    liveness: number
    /**
     * The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
     * @type Float
     */
    loudness: number
    /**
     * Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
     * @type Integer
     */
    mode: number
    /**
     * Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
     * @type Float
     */
    speechiness: number
    /**
     * The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
     * @type Float
     */
    tempo: number
    /**
     * An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).
     * @type Integer
     */
    time_signature: number
    /** A link to the Web API endpoint providing full details of the track. */
    track_href: SpotifyUrl<'tracks'>
    /** The object type: “audio_features” */
    type: 'audio_features'
    /** The Spotify URI for the track. */
    uri: string
    /**
     * A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
     * @type Float
     */
    valence: number
}

/** [Category Object](https://developer.spotify.com/documentation/web-api/reference/#object-categoryobject) */
export interface CategoryObject {
    /** A link to the Web API endpoint returning full details of the category. */
    href: SpotifyUrl<'categories'>
    /** The category icon, in various sizes. */
    icons: ImageObject[]
    /** The [Spotify category ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) of the category. */
    id: string
    /** The name of the category. */
    name: string
}

/** [Context Object](https://developer.spotify.com/documentation/web-api/reference/#object-contextobject) */
export interface ContextObject<T extends 'artist' | 'playlist' | 'album' | 'track' | 'show' | 'episode'> {
    /** The object type. */
    type: T
    /** A link to the Web API endpoint providing full details. */
    href: `https://api.spotify.com/v1/${T}s/${string}`
    /** Known external URLs. */
    external_urls: ExternalUrlObject
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids). */
    uri: string
}

/** [Copyright Object](https://developer.spotify.com/documentation/web-api/reference/#object-copyrightobject) */
export interface CopyrightObject {
    /** The copyright text for this content. */
    text: string
    /** The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright. */
    type: 'C' | 'P'
}

/** [Currently Playing Context Object](https://developer.spotify.com/documentation/web-api/reference/#object-currentlyplayingcontextobject) */
export interface CurrentlyPlayingContextObject extends CurrentlyPlayingObject {
    /** Allows to update the user export interface based on which playback actions are available within the current context. */
    actions: DisallowsObject
    /** The device that is currently active. */
    device: DeviceObject
    /** If something is currently playing, return `true`. */
    repeat_state: string
    /** If shuffle is on or off. */
    shuffle_state: string
}

/** [Currently Playing Object](https://developer.spotify.com/documentation/web-api/reference/#object-currentlyplayingobject) */
export interface CurrentlyPlayingObject {
    /** A Context Object. Can be `null`. */
    context: ContextObject<'track'> | ContextObject<'episode'> | null
    /** The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`. */
    currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown'
    /** If something is currently playing, return `true`. */
    is_playing: boolean
    /** The currently playing track or episode. Can be `null`. */
    item: TrackObject | null
    /** Progress into the currently playing track or episode. Can be `null`. */
    progress_ms: number | null
    /** Unix Millisecond Timestamp when data was fetched. */
    timestamp: number
}

/** [Cursor Object](https://developer.spotify.com/documentation/web-api/reference/#object-cursorobject) */
export interface CursorObject {
    /** The cursor to use as key to find the next page of items. */
    after: string
}

/** [Cursor Paging Object](https://developer.spotify.com/documentation/web-api/reference/#object-cursorpagingobject) */
export interface CursorPagingObject<
    T extends AlbumObject | ArtistObject,
    E extends T extends AlbumObject ? 'albums' : 'artists'
>
    extends PagingObject<T, E> {
    /** The cursors used to find the next set of items. */
    cursors: CursorObject
}

/**
 * [Device Object](https://developer.spotify.com/documentation/web-api/reference/#object-deviceobject)
 *
 * [Devices Object](https://developer.spotify.com/documentation/web-api/reference/#object-devicesobject) = [Device Object]
 */
export interface DeviceObject {
    /** The device ID. This may be `null`. */
    id: string | null
    /** If this device is the currently active device. */
    is_active: boolean
    /** If this device is currently in a private session. */
    is_private_session: boolean
    /** Whether controlling this device is restricted. At present if this is “true” then no Web API commands will be accepted by this device. */
    is_restricted: boolean
    /** The name of the device. */
    name: string
    /** Device type, such as “computer”, “smartphone” or “speaker”. */
    type: string
    /** The current volume in percent. This may be null. */
    volume_percent: number | null
}

/** [Disallows Object](https://developer.spotify.com/documentation/web-api/reference/#object-disallowsobject) */
export interface DisallowsObject {
    /** Interrupting playback. Optional field. */
    interrupting_playback?: Boolean
    /** Pausing. Optional field. */
    pausing?: Boolean
    /** Resuming. Optional field. */
    resuming?: Boolean
    /** Seeking playback location. Optional field. */
    seeking?: Boolean
    /** Skipping to the next context. Optional field. */
    skipping_next?: Boolean
    /** Skipping to the previous context. Optional field. */
    skipping_prev?: Boolean
    /** Toggling repeat context flag. Optional field. */
    toggling_repeat_context?: Boolean
    /** Toggling repeat track flag. Optional field. */
    toggling_repeat_track?: Boolean
    /** Toggling shuffle flag. Optional field. */
    toggling_shuffle?: Boolean
    /** Transfering playback between devices. Optional field. */
    transferring_playback?: Boolean
}

/** [Episode Object](https://developer.spotify.com/documentation/web-api/reference/#object-episodeobject) */
export interface EpisodeObject extends SimplifiedEpisodeObject {
    /** The show on which the episode belongs. */
    show: SimplifiedShowObject
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode. */
    uri: string
}

/** [Error Object](https://developer.spotify.com/documentation/web-api/reference/#object-errorobject) */
export interface ErrorObject {
    /** The HTTP status code (also returned in the response header; see [Response Status Codes](https://developer.spotify.com/documentation/web-api/#response-status-codes) for more information). */
    status: number
    /** A short description of the cause of the error. */
    message: string
}

/** [Explicit Content Settings Object](https://developer.spotify.com/documentation/web-api/reference/#object-explicitcontentsettingsobject) */
export interface ExplicitContentSettingsObject {
    /** When true, indicates that explicit content should not be played. */
    filter_enabled: Boolean
    /** When true, indicates that the explicit content setting is locked and can’t be changed by the user. */
    filter_locked: Boolean
}

/** [External Id Object](https://developer.spotify.com/documentation/web-api/reference/#object-externalidobject) */
export interface ExternalIdObject {
    /** [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
    isrc?: string
    /** [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
    ean?: string
    /** [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
    upc?: string
}

/** [External Url Object](https://developer.spotify.com/documentation/web-api/reference/#object-externalurlobject) */
export interface ExternalUrlObject {
    /** The [Spotify URL](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the object. */
    spotify: string
}

/** [Followers Object](https://developer.spotify.com/documentation/web-api/reference/#object-followersobject) */
export interface FollowersObject {
    /** A link to the Web API endpoint providing full details of the followers; `null` if not available. Please note that this will always be set to null, as the Web API does not support it at the moment. */
    href: null // | string
    /** The total number of followers. */
    total: number
}

/** [Image Object](https://developer.spotify.com/documentation/web-api/reference/#object-imageobject) */
export interface ImageObject {
    /** The image height in pixels. If unknown: `null` or not returned. */
    height: number | null
    /** The source URL of the image. */
    url: string
    /** The image width in pixels. If unknown: null or not returned. */
    width: number | null
}

/** [Linked Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-linkedtrackobject) */
export interface LinkedTrackObject {
    /** Known external URLs for this track. */
    external_urls: ExternalUrlObject
    /** A link to the Web API endpoint providing full details of the track. */
    href: SpotifyUrl<'tracks'>
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track. */
    id: string
    /** The object type: “track”. */
    type: 'track'
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the track. */
    uri: string
}

/** [Paging Object](https://developer.spotify.com/documentation/web-api/reference/#object-pagingobject) */
export interface PagingObject<T, E extends Endpoint> {
    /** A link to the Web API endpoint returning the full result of the request */
    href: SpotifyUrl<E>
    /** The requested data. */
    items: T[]
    /** The maximum number of items in the response (as set in the query or by default). */
    limit: number
    /** URL to the next page of items. (`null` if none) */
    next: SpotifyUrl<E> | null
    /** The offset of the items returned (as set in the query or by default) */
    offset: number
    /** URL to the previous page of items. (`null` if none) */
    previous: SpotifyUrl<E> | null
    /** The total number of items available to return. */
    total: number
}

/** [Play History Object](https://developer.spotify.com/documentation/web-api/reference/#object-playhistoryobject) */
export interface PlayHistoryObject {
    /** The context the track was played from. */
    context: ContextObject<'album'> | ContextObject<'playlist'>
    /** The date and time the track was played. */
    played_at: string
    /** The track the user listened to. */
    track: SimplifiedTrackObject
}

/** [Player Error Object](https://developer.spotify.com/documentation/web-api/reference/#object-playererrorobject) */
export interface PlayerErrorObject {
    /** A short description of the cause of the error. */
    messaage: string
    /**
     * - `NO_PREV_TRACK` - The command requires a previous track, but there is none in the context.
     * - `NO_NEXT_TRACK` - The command requires a next track, but there is none in the context.
     * - `NO_SPECIFIC_TRACK` - The requested track does not exist.
     * - `ALREADY_PAUSED` - The command requires playback to not be paused.
     * - `NOT_PAUSED` - The command requires playback to be paused.
     * - `NOT_PLAYING_LOCALLY` - The command requires playback on the local device.
     * - `NOT_PLAYING_TRACK` - The command requires that a track is currently playing.
     * - `NOT_PLAYING_CONTEXT` - The command requires that a context is currently playing.
     * - `ENDLESS_CONTEXT` - The shuffle command cannot be applied on an endless context.
     * - `CONTEXT_DISALLOW` - The command could not be performed on the context.
     * - `ALREADY_PLAYING` - The track should not be restarted if the same track and context is already playing, and there is a resume point.
     * - `RATE_LIMITED` - The user is rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.
     * - `REMOTE_CONTROL_DISALLOW` - The context cannot be remote-controlled.
     * - `DEVICE_NOT_CONTROLLABLE` - Not possible to remote control the device.
     * - `VOLUME_CONTROL_DISALLOW` - Not possible to remote control the device’s volume.
     * - `NO_ACTIVE_DEVICE` - Requires an active device and the user has none.
     * - `PREMIUM_REQUIRED` - The request is prohibited for non-premium users.
     * - `UNKNOWN` - Certain actions are restricted because of unknown reasons.
     */
    reason:
        | 'NO_PREV_TRACK'
        | 'NO_NEXT_TRACK'
        | 'NO_SPECIFIC_TRACK'
        | 'ALREADY_PAUSED'
        | 'NOT_PAUSED'
        | 'NOT_PLAYING_LOCALLY'
        | 'NOT_PLAYING_TRACK'
        | 'NOT_PLAYING_CONTEXT'
        | 'ENDLESS_CONTEXT'
        | 'CONTEXT_DISALLOW'
        | 'ALREADY_PLAYING'
        | 'RATE_LIMITED'
        | 'REMOTE_CONTROL_DISALLOW'
        | 'DEVICE_NOT_CONTROLLABLE'
        | 'VOLUME_CONTROL_DISALLOW'
        | 'NO_ACTIVE_DEVICE'
        | 'PREMIUM_REQUIRED'
        | 'UNKNOWN'
    /** The HTTP status code. Either `404 NOT FOUND` or `403 FORBIDDEN`. Also returned in the response header. */
    status: number
}

/** [Playlist Object](https://developer.spotify.com/documentation/web-api/reference/#object-playlistobject) */
export interface PlaylistObject extends Omit<SimplifiedPlaylistObject, 'tracks'> {
    /** Information about the followers of the playlist. */
    followers: FollowersObject
    /** Information about the tracks of the playlist. */
    tracks: PagingObject<PlaylistTrackObject, 'playlist’s tracks'>
}

/** [Playlist Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-playlisttrackobject) */
export interface PlaylistTrackObject {
    /** The date and time the track or episode was added. *Note that some very old playlists may return `null` in this field.* */
    added_at: string | null
    /** The Spotify user who added the track or episode. *Note that some very old playlists may return `null` in this field.* */
    added_by: PublicUserObject | null
    /** Whether this track or episode is a [local file](https://developer.spotify.com/web-api/local-files-spotify-playlists/) or not. */
    is_local: boolean
    /** Information about the track or episode. */
    track: TrackObject // | EpisodeObject
    // TODO - Update documentation
    // Update documentation for primary_color.
    /** This property is not currently on the official SpotifyAPI documentation */
    primary_color: null
    // TODO - Update documentation
    // Update documentation for video_thumbnail.
    /** This property is not currently on the official SpotifyAPI documentation */
    video_thumbnail: {
        url: null
    }
}

/** [Playlist Tracks Ref Object](https://developer.spotify.com/documentation/web-api/reference/#object-playlisttracksrefobject) */
export interface PlaylistTracksRefObject {
    /** A link to the Web API endpoint where full details of the playlist’s tracks can be retrieved. */
    href: SpotifyUrl<'playlist’s tracks'>
    /** Number of tracks in the playlist. */
    total: number
}

/** [Private User Object](https://developer.spotify.com/documentation/web-api/reference/#object-privateuserobject) */
export interface PrivateUserObject extends PublicUserObject {
    /** The country of the user, as set in the user’s account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). *This field is only available when the current user has granted access to the [user-read-private scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes).* */
    country: string
    /** The user’s explicit content settings. *This field is only available when the current user has granted access to the [user-read-private](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) scope.* */
    explicit_content: ExplicitContentSettingsObject
    /** The user’s email address, as entered by the user when creating their account. ***Important!*** *This email address is unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the [user-read-email](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) scope.* */
    email: string | null
    /** The user’s Spotify subscription level: “premium”, “free”, etc. (The subscription level “open” can be considered the same as “free”.) *This field is only available when the current user has granted access to the [user-read-private](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes) scope.* */
    product: string
}

/** [Public User Object](https://developer.spotify.com/documentation/web-api/reference/#object-publicuserobject) */
export interface PublicUserObject {
    /** The name displayed on the user’s profile. `null` if not available. */
    display_name: string
    /** Known public external URLs for this user. */
    external_urls: ExternalUrlObject
    /** Information about the followers of this user. */
    followers: FollowersObject
    /** A link to the Web API endpoint for this user. */
    href: SpotifyUrl<'users'>
    /** The [Spotify user ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
    id: string
    /** The user’s profile image. */
    images?: ImageObject[]
    /** The object type: “user”. */
    type: 'user'
    /** The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for this user. */
    uri: string
}

/** [Recommendation Seed Object](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject) */
export interface RecommendationSeedObject<T extends 'ARTIST' | 'TRACK' | 'GENRE'>{
    /** The number of tracks available after min_* and max_* filters have been applied. */
    afterFilteringSize: number
    /** The number of tracks available after relinking for regional availability. */
    afterRelinkingSize: number
    /** A link to the full track or artist data for this seed. For tracks this will be a link to a [Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackobject). For artists a link to an [Artist Object](https://developer.spotify.com/documentation/web-api/reference/#object-artistobject). For genre seeds, this value will be `null`. */
    href: 
          T extends 'artist' ? SimplifiedArtistObject['href']
        : T extends 'track' ? SimplifiedTrackObject['href']
        : null
    /** The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter. */
    id: string
    /** The number of recommended tracks available for this seed. */
    initialPoolSize: number
    /** The entity type of this seed. One of `artist`, `track` or `genre`. */
    type: T
}

/** [Recommendations Object](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationsobject) */
export interface RecommendationsObject {
    /** An array of [recommendation seed objects](https://developer.spotify.com/documentation/web-api/reference/#object-recommendationseedobject). */
    seeds: (
          RecommendationSeedObject<'ARTIST'>
        | RecommendationSeedObject<'TRACK'>
        | RecommendationSeedObject<'GENRE'>
    )[]
    /** An array of [track object (simplified)](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedtrackobject) ordered according to the parameters supplied. */
    tracks: TrackObject[]
}

/** [Resume Point Object](https://developer.spotify.com/documentation/web-api/reference/#object-resumepointobject) */
export interface ResumePointObject {
    /** Whether or not the episode has been fully played by the user. */
    fully_played: boolean
    /** The user’s most recent position in the episode in milliseconds. */
    resume_position_ms: number
}

/** [Saved Album Object](https://developer.spotify.com/documentation/web-api/reference/#object-savedalbumobject) */
export interface SavedAlbumObject {
    /** The date and time the show was saved. Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object. */
    added_at: string
    /** Information about the album. */
    album: AlbumObject
}

/** [Saved Show Object](https://developer.spotify.com/documentation/web-api/reference/#object-savedshowobject) */
export interface SavedShowObject {
    /** The date and time the show was saved. Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object. */
    added_at: string
    /** Information about the show. */
    show: SimplifiedShowObject
}

/** [Saved Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-savedtrackobject) */
export interface SavedTrackObject {
    /** The date and time the show was saved. Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ. If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object. */
    added_at: string
    /** Information about the track. */
    track: TrackObject
}

/** [Show Object](https://developer.spotify.com/documentation/web-api/reference/#object-showobject) */
export interface ShowObject extends SimplifiedShowObject {
    /** A list of the show’s episodes. */
    episodes: PagingObject<SimplifiedEpisodeObject, 'show’s episodes'>
}

/** [Simplified Album Object](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedalbumobject) */
export interface SimplifiedAlbumObject extends ContextObject<'album'> {
    /** The field is present when getting an artist’s albums. Possible values are “album”, “single”, “compilation”, “appears_on”. Compare to album_type this field represents relationship between the artist and the album. */
    album_group?: 'album' | 'single' | 'compilation' | 'appears_on'
    /** The type of the album: one of “album”, “single”, or “compilation”. */
    album_type: 'album' | 'single' | 'compilation' | Uppercase<'album' | 'single' | 'compilation'>
    /** The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
    artists: SimplifiedArtistObject[]
    /** The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Note that an album is considered available in a market when at least 1 of its tracks is available in that market. */
    available_markets: string[]
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the album. */
    id: string
    /** The cover art for the album in various sizes, widest first. */
    images: ImageObject[]
    /** The name of the album. In case of an album takedown, the value may be an empty string. */
    name: string
    /** The date the album was first released, for example `1981`. Depending on the precision, it might be shown as `1981-12` or `1981-12-15`. */
    release_date: string
    /** The precision with which release_date value is known: `year`, `month`, or `day`. */
    release_date_precision: 'year' | 'month' | 'day'
    /** Included in the response when a content restriction is applied. See [Restriction Object](https://developer.spotify.com/documentation/web-api/reference/#object-albumrestrictionobject) for more details. */
    restrictions?: RestrictionObject
    // TODO - Update documentation
    // Update documentation for track_number. (Is it optional?)
    /** This property is not currently on the official SpotifyAPI documentation */
    total_tracks: number
}

/** [Simplified Artist Object](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedartistobject) */
export interface SimplifiedArtistObject extends ContextObject<'artist'> {
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the artist. */
    id: string
    /** The name of the artist. */
    name: string
}

/** [Simplified Episode Object](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedepisodeobject) */
export interface SimplifiedEpisodeObject extends ContextObject<'episode'> {
    /** A URL to a 30 second preview (MP3 format) of the episode. null if not available. */
    audio_preview_url: string | null
    /** A description of the episode. */
    description: string
    /** The episode length in milliseconds. */
    duration_ms: number
    /** Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
    explicit: boolean
    /** A description of the episode. This field may contain HTML tags. */
    html_description: string
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the episode. */
    id: string
    /** The cover art for the episode in various sizes, widest first. */
    images: ImageObject[]
    /** True if the episode is hosted outside of Spotify’s CDN. */
    is_externally_hosted: boolean
    /** True if the episode is playable in the given market. Otherwise false. */
    is_playable: boolean
    /**
     * The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.
     * @deprecated This field is deprecated and might be removed in the future. Please use the {@link EpisodeObject.languages `languages`} field instead.
     */
    language: string
    /** A list of the languages used in the episode, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. Optional because sometimes only the deprecated language field is set and this one isn't set at all. */
    languages?: string[]
    /** The name of the episode. */
    name: string
    /** The date the episode was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12". */
    release_date: string
    /** The precision with which release_date value is known: "year", "month", or "day". */
    release_date_precision: 'year' | 'month' | 'day'
    /** The user’s most recent position in the episode. Set if the supplied access token is a user token and has the scope user-read-playback-position. */
    resume_point?: ResumePointObject
}

/** [Simplified Playlist Object](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedplaylistobject) */
export interface SimplifiedPlaylistObject extends ContextObject<'playlist'> {
    /** Whether or not the owner allows other users to modify the playlist. */
    collaborative: Boolean
    /** The playlist description. Only returned for modified, verified playlists, otherwise `null`. */
    description: string | null
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist. */
    id: string
    /**
     * Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
     *
     * Note: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day.
     */
    images: ImageObject[]
    /** The name of the playlist. */
    name: string
    /** The user who owns the playlist */
    owner: Omit<PublicUserObject, 'followers'>
    /** The playlist’s public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/). */
    public: boolean | null
    /** The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version. */
    snapshot_id: string
    /**
     * A collection containing a link (`href`) to the Web API endpoint where full details of the playlist’s tracks can be retrieved, along with the `total` number of tracks in the playlist.
     *
     * Note, a track object may be `null`. This can happen if a track is no longer available.
     */
    tracks: PlaylistTracksRefObject | null,
    primary_color: null
}

/** [Simplified Show Object](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedshowobject) */
export interface SimplifiedShowObject extends ContextObject<'show'> {
    /** A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2 code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). */
    available_markets: string[]
    /** The copyright statements of the show. */
    copyrights: CopyrightObject[]
    /** A description of the show. */
    description: string
    /** Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
    explicit: boolean
    /** A description of the show. This field may contain HTML tags. */
    html_description: string
    /** The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the show. */
    id: string
    /** The cover art for the show in various sizes, widest first. */
    images: ImageObject[]
    /** True if all of the show’s episodes are hosted outside of Spotify’s CDN. This field might be null in some cases. */
    is_externally_hosted: boolean | null
    /** A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
    languages: string[]
    /** The media type of the show. */
    media_type: string
    /** The name of the show. */
    name: string
    /** The publisher of the show. */
    publisher: string
    /**
     * Number of episodes in the show.
     * 
     * *Note: - This property is not in the Spotify API Documentation.*
     */
    total_episodes: number
}

/** [Simplified Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-simplifiedtrackobject) */
export interface SimplifiedTrackObject extends ContextObject<'track'> {
    /** The artists who performed the track. */
    artists: SimplifiedArtistObject[]
    /** A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2 code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). */
    available_markets: string[]
    /** The disc number (usually `1` unless the album consists of more than one disc). */
    disc_number: number
    /** The track length in milliseconds. */
    duration_ms: number
    /** Whether or not the track has explicit lyrics (`true` = yes it does; `false` = no it does not OR unknown). */
    explicit: boolean
    /** Known external URLs for this track. */
    id: string
    /** Whether or not the track is from a local file. */
    is_local: boolean
    /** Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied. If `true`, the track is playable in the given market. Otherwise, `false`. */
    is_playable?: boolean
    /** Part of the response when [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track. */
    linked_from?: LinkedTrackObject
    /** The name of the track. */
    name: string
    /** A link to a 30 second preview (MP3 format) of the track. Can be null */
    preview_url: string | null
    /** Included in the response when a content restriction is applied. See [Restriction Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackrestrictionobject) for more details. */
    restrictions?: RestrictionObject
    /** The number of the track. If an album has several discs, the track number is the number on the specified disc. */
    track_number: number
}

/** [Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-trackobject) */
export interface TrackObject extends SimplifiedTrackObject {
    /** The album on which the track appears. */
    album: SimplifiedAlbumObject
    /** Known external IDs for the track. */
    external_ids: ExternalIdObject
    /**
     * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
     *
     * The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
     *
     * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.
     */
    popularity: number
    // TODO - Update documentation
    // Update documentation for episode & track. (Is it optional? Is it part of SimplifiedTrackObject)
    /** This property is not currently on the official SpotifyAPI documentation */
    episode?: boolean
    /** This property is not currently on the official SpotifyAPI documentation */
    track?: boolean
}

/** [Tuneable Track Object](https://developer.spotify.com/documentation/web-api/reference/#object-tuneabletrackobject) */
export interface TuneableTrackObject {
    /**
     * A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
     * @type Float
     */
    acousticness: number
    /**
     * Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
     * @type Float
     */
    danceability: number
    /**
     * The duration of the track in milliseconds.
     * @type Integer
     */
    duration_ms: number
    /**
     * Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
     * @type Float
     */
    energy: number
    /**
     * Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
     * @type Float
     */
    instrumentalness: number
    /**
     * The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.
     * @type Integer
     */
    key: number
    /**
     * Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
     * @type Float
     */
    liveness: number
    /**
     * The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db.
     * @type Float
     */
    loudness: number
    /**
     * Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
     * @type Integer
     */
    mode: number
    /**
     * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Note: When applying track relinking via the market parameter, it is expected to find relinked tracks with popularities that do not match min_*, max_*and target_* popularities. These relinked tracks are accurate replacements for unplayable tracks with the expected popularity scores. Original, non-relinked tracks are available via the linked_from attribute of the relinked track response.
     * @type Float
     */
    popularity: number
    /**
     * Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
     * @type Float
     */
    speechiness: number
    /**
     * The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
     * @type Float
     */
    tempo: number
    /**
     * An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure).
     * @type Integer
     */
    time_signature: number
    /**
     * A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
     * @type Float
     */
    valence: number
}