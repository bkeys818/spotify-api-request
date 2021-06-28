import {
    PagingObject,
    HasEndpoint,
    ContextObject,
    ExternalIdObject,
    ImageObject,
    CopyrightObject,
    FollowersObject
} from '../../src/api/objects'

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

export const followerObject: FollowersObject = {
    href: expect.any(String),
    total: expect.any(Number),
}

export function testCopyrightObject(value: CopyrightObject): CopyrightObject {
    const expectedObj: CopyrightObject = {
        text: expect.any(String),
        type: expect.stringMatching(/C|P/)
    }
    expect(value).toEqual(expectedObj)
    return expectedObj
}

export function testExternalIdObject(value: ExternalIdObject): ExternalIdObject {
    const expectedObj: ExternalIdObject = {}
    if (value.ean) expectedObj.ean = expect.any(String)
    if (value.isrc) expectedObj.isrc = expect.any(String)
    if (value.upc) expectedObj.upc = expect.any(String)
    return expectedObj
}

export function testImageObject(value: ImageObject): ImageObject {
    const expectedObj: ImageObject = {
        url: expect.any(String)
    }
    if (value.height) expectedObj.height = expect.any(Number)
    if (value.width) expectedObj.width = expect.any(Number)
    return expectedObj
}