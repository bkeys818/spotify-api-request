import { SpotifyError } from '../error'
import fetch, { RequestInit } from 'node-fetch'
import { Token } from '.'
import { RefreshToken } from './refreshToken'

/**
 * Makes sure state values match. If not, throws the appropriate errors.
 * @param a Expected state value
 * @param b Provided state value
 */
export function checkState(a: string, b?: string) {
    if (b) {
        if (a != b)
            throw new SpotifyError("State value doesn't match.", 'getToken')
    } else throw new SpotifyError('No state provided.', 'getToken')
}

/** Parse an parameters from hash */
export function paramsFromHash(hash?: string, state?: string) {
    // get hash value & clear it from url
    if (!hash) {
        hash = location.hash
        const uri = location.toString()
        const hashIndex = uri.indexOf('?')
        if (hashIndex > 0) {
            const cleanUri = uri.substring(0, hashIndex)
            window.history.replaceState({}, document.title, cleanUri)
        }
    }
    if (hash[0] == '#') hash = hash.slice(1)

    // throw error if hash is empty
    if (!hash) throw new SpotifyError('Missing hash value', 'getToken')

    // get obj from hash
    const hashObj: { [key: string]: string } = {}
    for (const param of hash.split('&')) {
        const [key, value] = param.split('=')
        hashObj[key] = decodeURIComponent(value)
    }

    // if present, make sure state values match
    if (hashObj.state) checkState(hashObj.state, state)

    // if spotify returned error, throw it
    if (hashObj.error) throw new SpotifyError(hashObj.error, 'getToken')

    return hashObj
}

interface Init extends Omit<RequestInit, 'body'> {
    body?: { [key: string]: string }
}

export async function fetchToken<T extends Token | RefreshToken>(
    init: Init
): Promise<T> {
    let body = ''
    for (const key in init.body) {
        body += `${key}=${init.body[key]}&`
    }
    body = body.slice(0, -1)

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...init.headers,
        },
        body: body
    })
    if (res.ok) return await res.json()
    else {
        let msg: string
        try {
            msg = (await res.json()).error_description
        } catch {
            msg = `Unknown error during fetch.`
        }
        throw new SpotifyError(msg, 'getToken')
    }
}