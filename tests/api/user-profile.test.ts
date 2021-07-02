import { getCurrentUsersProfile, getUsersProfile } from '../../src/api/user-profile'
import { PrivateUserObject, PublicUserObject } from '../../src/api/objects'
import { imageObject, followerObject } from './global'

const usersUrlRegExp =  /https:\/\/api\.spotify\.com\/v1\/users\/[a-z\d-_\.~]+/i

export function publicUserObject(value: PublicUserObject): PublicUserObject {
    return {
        display_name: expect.any(String),
        explicit_content: {
            filter_enabled: expect.any(Boolean),
            filter_locked: expect.any(Boolean),
        },
        external_urls: {
            spotify: expect.any(String)
        },
        followers: followerObject,
        href: expect.stringMatching(usersUrlRegExp),
        id: expect.any(String),
        images: expect.arrayContaining<typeof value.images[number]>(
            value.images.map(imageObject)
        ),
        type: 'user',
        uri: expect.any(String),
    }
}

export function privateUserObject(value: PrivateUserObject): PrivateUserObject {
    return {
        ...publicUserObject(value),
        country: expect.any(String),
        email: value.email ? expect.any(String): null,
        product: expect.any(String),
    }
}

// @ts-ignore
const token = global.token
export const userID = 'spotify'

test(getCurrentUsersProfile.name, async () => {
    const res = await getCurrentUsersProfile(token)
    expect(res).toMatchObject<typeof res>(privateUserObject(res))
})

test(getUsersProfile.name, async () => {
    const res = await getUsersProfile(token, userID)
    expect(res).toMatchObject<typeof res>(publicUserObject(res))
})