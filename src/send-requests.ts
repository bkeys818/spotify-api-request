import fetch, { RequestInit } from 'node-fetch'
import { checkStatus } from './error'
import { Token } from 'spotify-objects'

export default async function sendRequest(args: RequestOptions): Promise<any> {
    const url = new URL('https://api.spotify.com/v1/' + args.endpoint)

    for (const key in args.queryParameter)
        if (args.queryParameter[key])
            url.searchParams.set(key, convertToString(args.queryParameter[key]))

    const options: RequestInit = {
        headers: {
            Authorization: formatToken(args.token),
            'Content-Type': 'application/json',
        },
        method: args.method ?? 'GET',
    }

    if (args.bodyParameter)
        options.body =
            typeof args.bodyParameter == 'object'
                ? JSON.stringify(args.bodyParameter)
                : args.bodyParameter

    const res = await fetch(url.href, options)
    const error = await checkStatus(res)

    if (error) throw error
    else {
        try {
            return res.json()
        } catch {
            return
        }
    }
}

const convertToString = (value: UrlParameter[string]) =>
    Array.isArray(value) ? value.join() : value.toString()

function formatToken(value: Token | string) {
    if (typeof value == 'string') {
        return `Bearer ${value}`
    } else {
        return value.token_type + ' ' + value.access_token
    }
}

interface RequestOptions {
    readonly token: Token | string
    readonly endpoint: string
    readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    // headers?: { [key: string]: string }
    // pathParameter?: UrlParameter
    readonly queryParameter?: UrlParameter
    readonly bodyParameter?: Record<string, any> | string
}

type UrlParameter = Record<
    string,
    boolean | number | string | Array<boolean | number | string>
>
