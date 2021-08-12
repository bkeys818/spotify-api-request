/** Parse an parameters from hash */
export function paramsFromBody(body: string) {
    // get obj from hash
    const hashObj: { [key: string]: string } = {}
    for (const param of body.split('&')) {
        const [_key, value] = param.split('=')
        const key = _key.replace(/_[a-z]/g, ($1) => $1.toUpperCase().replace('_', ''))
        hashObj[key] = decodeURIComponent(value)
    }
    return hashObj
}