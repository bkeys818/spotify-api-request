// import type { Globals } from '../../jest.config'
// import { getCurrentUsersProfile, getUsersProfile } from '../../src/api/user-profile'
// import { PrivateUserObject, PublicUserObject } from '../../src/api/objects'
import { PublicUserObject } from '../../src/api/objects'
import { testImageObject, followerObject } from './global'

export function testPublicUserObject(value: PublicUserObject): PublicUserObject {
    const expectedObj: PublicUserObject = {
        display_name: expect.any(String),
        explicit_content: {
            filter_enabled: expect.any(Boolean),
            filter_locked: expect.any(Boolean),
        },
        external_urls: {
            spotify: expect.any(String)
        },
        followers: followerObject,
        href: expect.stringMatching(
            /https:\/\/api\.spotify\.com\/v1\/users\/[a-z\d]+/i
        ),
        id: expect.any(String),
        images: expect.any(Array),
        type: 'user',
        uri: expect.any(String),
    }

    value.images.forEach(testImageObject)

    expect(value).toMatchObject(expectedObj)

    return expectedObj
}