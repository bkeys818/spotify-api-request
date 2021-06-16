import { endpoints, Name, EndpointsInfo, RequestParams, Response } from './api'
import { SpotifyError } from './error'
import type { Token } from './authorize'
import fetch, * as Fetch from 'node-fetch'

export async function request<N extends Name>(
    name: N,
    options: {
        /** The Spotify authentication token. */
        token: string | Token
    } & RequestParams<N>
): Promise<Response<N>> {
    let url: string = endpoints[name].url
    if ('pathParameter' in options)
        // @ts-ignore
        for (let key in options['pathParameter']) {
            // @ts-ignore
            url = url.replace(key, options['pathParameter'][key])
        }
    if ('queryParameter' in options) {
        url += '?'
        // @ts-ignore
        for (let key in options['queryParameter']) {
            // @ts-ignore
            url += key + '=' + options['queryParameter'][key] + '&'
        }
        url.slice(0, -1)
    }

    const reqOptions: Fetch.RequestInit = {}
    if ('header' in options) {
        reqOptions.headers = options['header']
    }
    reqOptions.headers = {
        Authorization:
            typeof options.token == 'string'
                ? options.token
                : `${options.token.token_type} ${options.token.access_token}`,
        ...reqOptions.headers,
    }
    reqOptions.method = endpoints[name].method
    
    return await sendRequest(url, reqOptions)
}

export async function requestWithURL<E extends EndpointsInfo>({
    url,
    method,
    token,
}: E & { token: string | Token }): Promise<Response<E>> {
    return await sendRequest(url, {
        headers: {
            Authorization:
                typeof token == 'string'
                    ? token
                    : `${token.token_type} ${token.access_token}`,
        },
        method: method,
    })
}

async function sendRequest<R extends Name | EndpointsInfo>(
    url: string,
    options: Fetch.RequestInit
): Promise<Response<R>> {
    const response = await fetch(url, options),
        error = await checkStatus(response)

    if (error) throw error
    try {
        return await response.json()
    } catch(error) {
        throw new SpotifyError('Unknown error during request', 'unknown', error)
    }
}

/** Checks status, and if error is found, a SpotifyError is returned */
async function checkStatus(res: Fetch.Response) {
    if (res.status === 200 || res.status === 201 || res.status === 202) return
    if (res.status === 400 || res.status === 401) {
        const message = ((await res.json()).error as RegularError).message
        if (res.status === 401 || message === 'Only valid bearer authentication supported') {
            return new SpotifyError( 'Unauthorized: ' + message, 'authorization', res.headers.get('Authorization'))
        }
        return new SpotifyError('Bad Request: ' + message, 'request')
    }

    if (res.status in SpotifyError.errorCodes) {
        const info = SpotifyError.detailsFor(res.status)
        return new SpotifyError(info.message, info.type)
    }

    return new SpotifyError(`Unknown status code (${res.status})`, 'unknown')
}