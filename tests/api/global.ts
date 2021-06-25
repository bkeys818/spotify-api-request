import { PagingObject, HasEndpoint, ContextObject, ExternalIdObject, ImageObject } from '../../src/api/objects'

export type UnwrapPromise<P> = P extends Promise<infer T> ? T : P

export const pagingObject = <T extends HasEndpoint>(props: {
    value: PagingObject<T>,
    url: PagingObject<T>['href'],
    itemTest: (value: T) => T
}): PagingObject<T> => {
    const expectedObj: PagingObject<T> = {
        href: props.url,
        items: expect.any(Array),
        limit: expect.any(Number),
        next: (props.value.next === null ? null : props.url),
        offset: expect.any(Number),
        previous: (props.value.next === null ? null : props.url),
        total: expect.any(Number)
    }
    props.value.items.forEach(props.itemTest)
    return expectedObj
}

type ContextObjectType = 'artist' | 'playlist' | 'album' | 'track' | 'show' | 'episode'
export const contextObject = <T extends ContextObjectType>(type: T): ContextObject<T> => ({
    type: type,
    href: expect.stringMatching(
        new RegExp(`https:\\/\\/api\\.spotify\\.com\\/v1\\/${type}s\\/[a-z\\d]+(\\?.+)?`, 'i')
    ),
    external_urls: {
        spotify: expect.any(String)
    },
    uri: expect.any(String)
})

export function externalIdObject(value: ExternalIdObject): ExternalIdObject {
    const expectedObj: ExternalIdObject = {}
    if (value.ean) expectedObj.ean = expect.any(String)
    if (value.isrc) expectedObj.isrc = expect.any(String)
    if (value.upc) expectedObj.upc = expect.any(String)
    return expectedObj
}

export function imageObject(value: ImageObject): ImageObject {
    const expectedObj: ImageObject = {
        url: expect.any(String)
    }
    if (value.height) expectedObj.height = expect.any(Number)
    if (value.width) expectedObj.width = expect.any(Number)
    return expectedObj
}