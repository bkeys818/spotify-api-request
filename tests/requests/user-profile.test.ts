import {
    getCurrentUserProfile,
    getUserProfile,
} from '../../src/requests/user-profile'
import { privateUserObject, publicUserObject } from '../objects'

// @ts-ignore
const token = global.token
const userID = 'spotify'

describe(getCurrentUserProfile, () => {
    test.concurrent('basic request', async () => {
        const res = await getCurrentUserProfile(token)

        expect(res).toStrictEqual<typeof res>(privateUserObject(res))
    })
})

describe(getUserProfile, () => {
    test.concurrent('basic request', async () => {
        const res = await getUserProfile(token, userID)

        expect(res).toStrictEqual<typeof res>(publicUserObject(res))
    })
})
