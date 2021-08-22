import fetch, { RequestInit, Response } from 'node-fetch'
import { checkStatus } from './error'

type UrlParameter = {
    [key: string]: boolean | number | string | Array<boolean | number | string>
}

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

    if (pathParameter)
        for (const key in pathParameter)
            if (pathParameter[key])
                params.endpoint = params.endpoint.replace(
                    `{${key}}`,
                    convertToString(pathParameter[key])
                )

    const url = new URL('https://api.spotify.com/v1/' + params.endpoint)

    if (queryParameter)
        for (const key in queryParameter)
            if (queryParameter[key])
                url.searchParams.set(key, convertToString(queryParameter[key]))

    const options: RequestInit = {
        headers: { Authorization: formatToken(params.token) },
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

    const res = await fetch(url.href, options)
    const error = await checkStatus(res)

    if (error) throw error
    else return res
}

const convertToString = (value: UrlParameter[keyof UrlParameter]) =>
    Array.isArray(value) ? value.join() : value.toString()

function formatToken(value: Token | string) {
    if (typeof value == 'string') {
        return `Bearer ${value}`
    } else {
        return value.token_type + ' ' + value.access_token
    }
}
