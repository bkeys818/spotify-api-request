type ContextObjectType = 'artist' | 'playlist' | 'album' | 'track' | 'show' | 'episode'
export const contextObject = <T extends ContextObjectType>(type: T): ContextObject<T> => ({
        type: type,
        href: expect.stringMatching(new RegExp(`https:\\/\\/api\\.spotify\\.com\\/v1\\/${type}s\\/[a-zA-Z\\d]+`)),
        external_urls: expect.objectContaining({
            spotify: expect.any(String)
        }),
        uri: expect.any(String)
})

export const copyrightObject: CopyrightObject = {
    text: expect.any(String),
    type: expect.stringMatching(/C|P/)
}

export function externalIdObject(value: ExternalIdObject) {
    const returnValue: typeof value = {}
    ;(['isrc', 'ean', 'upc'] as (keyof typeof value)[]).forEach(prop => {
        if (prop in value) returnValue[prop] = expect.any(String)
    })
    return returnValue
}

export const restrictionObject = {
    reason: expect.stringMatching(/market|product|explicit/)
}

export function imageObject(value: ImageObject) {
    const returnValue: typeof value = {
        url: expect.any(String),
    }
    if ('height' in value)
        returnValue.height = (returnValue.height === null ? null : expect.any(Number))
    if ('width' in value)
        returnValue.width = (returnValue.width === null ? null : expect.any(Number))

    return returnValue
}