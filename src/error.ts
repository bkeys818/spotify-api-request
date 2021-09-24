import { Response } from 'node-fetch'

type ASCII_ErrorCode =
    | 'invalid_request'
    | 'invalid_client'
    | 'invalid_grant'
    | 'unauthorized_client'
    | 'unsupported_grant_type';

/** Whenever the application makes requests related to authentication or authorization to Web API, such as retrieving an access token or refreshing an access token, the error response follows RFC 6749 on the OAuth 2.0 Authorization Framework. */
export interface AuthenticationError {
    /** A high level description of the error as specified in [RFC 6749 Section 5.2.](https://tools.ietf.org/html/rfc6749#section-5.2) */
    error: ASCII_ErrorCode;
    /** A more detailed description of the error as specified in [RFC 6749 Section 4.1.2.1.](https://tools.ietf.org/html/rfc6749#section-4.1.2.1) */
    error_description?: string;
}

/** Apart from the response code, unsuccessful responses return a JSON object containing the following information: */
export interface RegularError {
    /**	The HTTP status code that is also returned in the response header. For further information, see [Response Status Codes](https://developer.spotify.com/documentation/web-api/#response-status-codes). */
    status: number;
    /** A short description of the cause of the error. */
    message: string;
}

/** Checks status, and if error is found, a SpotifyError is returned */
export async function checkStatus(res: Response) {
    if (res.status === 200 || res.status === 201 || res.status === 202) return
    if (res.status === 400 || res.status === 401) {
        const message = ((await res.json()).error as RegularError).message
        if (
            res.status === 401 ||
            message === 'Only valid bearer authentication supported'
        ) {
            return new SpotifyError(
                'Unauthorized: ' + message,
                'token',
                res.headers.get('Authorization')
            )
        }
        return new SpotifyError('Bad Request: ' + message, 'request')
    }

    if (SpotifyError.errorCodes.includes(res.status)) {
        const info = SpotifyError.detailsFor(res.status)
        return new SpotifyError(info.message, info.type)
    }

    return new SpotifyError(`Unknown status code (${res.status})`, 'unknown')
}

type ErrorType = keyof typeof SpotifyError.Type

export class SpotifyError extends Error {

    /** Error type for machine */
    readonly type: ErrorType

    /** For Node.js system error */
    readonly internalError?: any

    readonly data?: any[]

    constructor(message: string, type: ErrorType)
    constructor(message: string, type: ErrorType, ...data: any[])
    constructor(message: string, type: 'unknown', internalError: any)
    constructor(
        message: string,
        type: ErrorType,
        dataOrSystemError?: any
    ) {
        super()
        Object.setPrototypeOf(this, SpotifyError.prototype)

        this.name = 'SpotifyError'
        this.type = type
        this.message = message

        if (type === 'unknown') this.internalError = dataOrSystemError
        else this.data = dataOrSystemError
        
        this.message = `${SpotifyError.Type[this.type]}! ${this.message}`
    }

    static readonly Type = {
        token: 'Invalid token',
        system: 'Internal error',
        authorizeToken: 'Failed to authorize token/refresh-token',
        getToken: 'Failed to get token/refresh-token',
        api: 'Failure in API',
        request: 'Inavlid request',
        unknown: 'Unknown error',
    } as const
    static readonly errorCodes = [304, 403, 429, 204, 404, 500, 502, 503]
    static readonly detailsFor = (code: ErrorCode) => errorDetails[code]

    log() {
        if (this.internalError) console.error(this.message, this.internalError)
        else if (this.data) console.error(this.message, ...this.data)
        else console.error(this.message)
    }
}

type ErrorCode = typeof SpotifyError.errorCodes[number]
interface ErrorDetails {
    type: ErrorType
    message: string
}
const errorDetails: { [key in ErrorCode]: ErrorDetails } = {
    304: {
        type: 'request',
        message: 'Not Modified: See Conditional requests.',
    },
    403: {
        type: 'request',
        message:
            'Forbidden: The server understood the request, but is refusing to fulfill it.',
    },
    429: {
        type: 'request',
        message: 'Too Many Requests: Rate limiting has been applied.',
    },
    404: {
        type: 'request',
        message:
            'Not Found: The requested resource could not be found. This error can be due to a temporary or permanent condition.',
    },
    204: {
        type: 'system',
        message:
            'No Content: The request has succeeded but returns no message body.',
    },
    500: {
        type: 'api',
        message:
            'Internal Server Error: You should never receive this error because our clever coders catch them all … but if you are unlucky enough to get one, please report it to us through a comment at the bottom of this page.',
    },
    502: {
        type: 'api',
        message:
            'Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
    },
    503: {
        type: 'api',
        message:
            'Service Unavailable: The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.',
    },
}