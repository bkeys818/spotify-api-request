type ASCII_ErrorCode =
    | 'invalid_request'
    | 'invalid_client'
    | 'invalid_grant'
    | 'unauthorized_client'
    | 'unsupported_grant_type';

/** Whenever the application makes requests related to authentication or authorization to Web API, such as retrieving an access token or refreshing an access token, the error response follows RFC 6749 on the OAuth 2.0 Authorization Framework. */
declare interface AuthenticationError {
    /** A high level description of the error as specified in [RFC 6749 Section 5.2.](https://tools.ietf.org/html/rfc6749#section-5.2) */
    error: ASCII_ErrorCode;
    /** A more detailed description of the error as specified in [RFC 6749 Section 4.1.2.1.](https://tools.ietf.org/html/rfc6749#section-4.1.2.1) */
    error_description: string;
}

/** Apart from the response code, unsuccessful responses return a JSON object containing the following information: */
declare interface RegularError {
    /**	The HTTP status code that is also returned in the response header. For further information, see [Response Status Codes](https://developer.spotify.com/documentation/web-api/#response-status-codes). */
    status: number;
    /** A short description of the cause of the error. */
    message: string;
}
