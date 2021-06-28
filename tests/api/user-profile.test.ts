import type { Globals } from '../../jest.config'
import { getCurrentUsersProfile, getUsersProfile } from '../../src/api/user-profile'
import { PrivateUserObject, PublicUserObject } from '../../src/api/objects'
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

export function testPrivateUserObject(value: PrivateUserObject): PrivateUserObject {
    const expectedObj: PrivateUserObject = {
        ...testPublicUserObject(value),
        country: expect.any(String),
        email: value.email ? expect.any(String): null,
        product: expect.any(String),
    }
    expect(value).toMatchObject(expectedObj)
    return expectedObj
}

const token = (global as unknown as Globals).testData.token
export const userID = 'spotify'

test(getCurrentUsersProfile.name, async () => {
    const res = await getCurrentUsersProfile(token)
    testPrivateUserObject(res)
})

test(getUsersProfile.name, async () => {
    const res = await getUsersProfile(token, userID)
    testPublicUserObject(res)
})