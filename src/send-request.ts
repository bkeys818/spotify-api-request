import fetch, { RequestInit, Response } from 'node-fetch'
import type { Token } from './authorize'

/** @internal */
type UrlParameter = {
    [key: string]: boolean | number | string | Array<boolean | number | string>
}

/** @internal */
export async function sendRequest(params: {
    endpoint: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    token: Token | string
    headers?: { [key: string]: string }
    pathParameter?: UrlParameter
    queryParameter?: UrlParameter
    bodyParameter?: { [key: string]: any } | string
}): Promise<Response> {
    const { pathParameter, queryParameter } = params

    let url = 'https://api.spotify.com/v1/' + params.endpoint

    if (pathParameter)
        for (const key in pathParameter) {
            url = url.replace(`{${key}}`, convertToString(pathParameter[key]))
        }

    if (queryParameter) {
        url += '?'
        for (const key in queryParameter) {
            url += `${key}=${convertToString(queryParameter[key])}&`
        }
        url = url.slice(0, -1)
    }

    const options: RequestInit = {
        headers: {
            Authorization:
                typeof params.token == 'string'
                    ? `Bearer ${params.token}`
                    : `${params.token.token_type} ${params.token.access_token}`,
        },
        method: params.method,
    }

    if (params.headers)
        options.headers = {
            ...options.headers,
            ...params.headers,
        }

    if (params.bodyParameter)
        options.body =
            typeof params.bodyParameter == 'object'
                ? JSON.stringify(params.bodyParameter)
                : params.bodyParameter

    return await fetch(url, options)
}

/** @internal */
function convertToString(value: any): string {
    if (
        typeof value == 'boolean' ||
        typeof value == 'string' ||
        typeof value == 'number'
    )
        return value.toString()
    else if (
        Array.isArray(value) &&
        value.every(
            (elem: any) =>
                typeof elem == 'boolean' ||
                typeof elem == 'string' ||
                typeof elem == 'number'
        )
    )
        return value.join()
    else throw new Error(`Invalid value used for pathParameter. (${value})`)
}