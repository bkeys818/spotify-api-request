import {
    getCurrentUserProfile,
    getUserProfile,
} from '../../src/requests/user-profile'
import { privateUserObject, publicUserObject } from '../objects'

// @ts-ignore
const token = global.token
const userID = 'spotify'

test.concurrent(getCurrentUserProfile.name, async () => {
    const res = await getCurrentUserProfile(token)

    expect(res).toStrictEqual<typeof res>(privateUserObject(res))
})

test.concurrent(getUserProfile.name, async () => {
    const res = await getUserProfile(token, userID)

    expect(res).toStrictEqual<typeof res>(publicUserObject(res))
})
