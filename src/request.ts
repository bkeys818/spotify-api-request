import { endpoints, Name, EndpointsInfo, RequestParams, Response } from './api'
import { SpotifyError, checkStatus } from './error'
import type { Token } from './authorize'
import fetch, { RequestInit } from 'node-fetch'

type RequestParams1<N extends Name> = {
    name: N
    token: string | Token
} & RequestParams<N>
type RequestParams2<E extends EndpointsInfo> = {
    url: E['url'],
    method: E['method'],
    token: string | Token
}

async function request<T extends Name | EndpointsInfo>(
    params:
          T extends EndpointsInfo ? RequestParams2<T>
        : T extends Name ? RequestParams1<T>
        : never
): Promise<Response<T>> {
    let url: string
    const requestInit: RequestInit = {}

    let { token } = params
    if (typeof token == 'object')
        token = `${token.token_type} ${token.access_token}`
    requestInit.headers = {
        Authorization: token
    }

    // overload 1
    if ('name' in params) {
        url = endpoints[params.name].url
        requestInit.method = endpoints[params.name].method
        
        if ('pathParameter' in params)
            for (let key in params['pathParameter']) {
                // @ts-ignore
                url = url.replace(key, params['pathParameter'][key])
            }

        if ('queryParameter' in params) {
            url += '?'
            for (let key in (params['queryParameter'])) {
                // @ts-ignore
                url += key + '=' + params['queryParameter'][key] + '&'
            }
            url = url.slice(0, -1)
        }

        if ('headers' in params)
            requestInit.headers = {
                ...requestInit.headers,
                ...params['headers']
            }

        if ('jsonBodyParameter' in params)
            requestInit.body = JSON.stringify(params['jsonBodyParameter'])

    // overload 2
    } else {
        const { url: _url, method } = params
        
        url = _url
        requestInit.method = method
    }

    const response = await fetch(url, requestInit),
        error = await checkStatus(response)

    if (error) throw error
    try {
        return await response.json()
    } catch (error) {
        throw new SpotifyError('Unknown error during request', 'unknown', error)
    }
}

export { request }