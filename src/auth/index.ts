export * from './refreshToken'
export * from './getToken'
import _createCode from 'pkce-challenge'

export function createCode() {
    const lng = Math.floor(Math.random() * (128 - 43)) + 43
    return _createCode(lng)
}

export function createState() {
    const lng = Math.floor(Math.random() * (32 - 24)) + 24
    // prettier-ignore
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'.split('')
    let str = ''
    for (var i = 0; i < lng; i++)
        str += chars[Math.floor(Math.random() * chars.length)]
    return str
}
