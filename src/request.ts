import fetch, { RequestInit, Response } from 'node-fetch'
import type { Token } from './authorize'

/** @internal */
export async function sendRequest(params: {
    endpoint: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    token: Token
    headers?: { [key: string]: any }
    pathParameter?: { [key: string]: any }
    queryParameter?: { [key: string]: any }
    jsonBodyParameter?: { [key: string]: any }
}): Promise<Response> {
    const {
        endpoint,
        method,
        token,
        headers,
        pathParameter,
        queryParameter,
        jsonBodyParameter,
    } = params

    let url = 'https://api.spotify.com/v1/' + endpoint

    if (pathParameter)
        for (const key in pathParameter) {
            url = url.replace(key, pathParameter[key] as string)
        }

    if (queryParameter) {
        url += '?'
        for (const key in queryParameter) {
            url += `${key}=${queryParameter[key]}&`
        }
        url = url.slice(0, -1)
    }

    const options: RequestInit = {
        headers: {
            Authorization: `${token.token_type} ${token.access_token}`,
        },
        method: method,
    }

    if (headers)
        options.headers = {
            ...options.headers,
            ...headers,
        }

    if (jsonBodyParameter) options.body = JSON.stringify(jsonBodyParameter)

    return await fetch(url, options)
}