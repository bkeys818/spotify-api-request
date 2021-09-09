declare interface Token {
    /** An access token that can be provided in subsequent calls, for example to Spotify Web API services. */
    access_token: string
    /** How the access token may be used. */
    token_type: 'Bearer'
    /** The time period (in seconds) for which the access token is valid. */
    expires_in: number
    /** A list of scopes which have been granted for this `access_token` */
    scope?: Scope[]
}

declare interface RefreshToken extends Token {
    /** A token that can be sent to the Spotify Accounts service in place of an authorization code. */
    refresh_token: string
}

/** Scopes enable your application to access specific API endpoints on behalf of a user. The set of scopes you pass in your call determines the access permissions that the user is required to grant. */
declare type Scope =
    | 'ugc-image-upload'
    | 'user-read-recently-played'
    | 'user-top-read'
    | 'user-read-playback-position'
    | 'user-read-playback-state'
    | 'user-modify-playback-state'
    | 'user-read-currently-playing'
    | 'app-remote-control'
    | 'streaming'
    | 'playlist-modify-public'
    | 'playlist-modify-private'
    | 'playlist-read-private'
    | 'playlist-read-collaborative'
    | 'user-follow-modify'
    | 'user-follow-read'
    | 'user-library-modify'
    | 'user-library-read'
    | 'user-read-email'
    | 'user-read-private'
