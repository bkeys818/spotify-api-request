import { token, userIDs } from '../global'
import {
    getCurrentUserProfile,
    getUserProfile,
} from '../../src/requests/user-profile'
import { privateUserObject, publicUserObject } from '../objects'

describe(getCurrentUserProfile, () => {
    test.concurrent('basic request', async () => {
        const res = await getCurrentUserProfile(token)

        expect(res).toStrictEqual<typeof res>(privateUserObject(res))
    })
})

describe(getUserProfile, () => {
    test.concurrent('basic request', async () => {
        const res = await getUserProfile(token, userIDs[0])

        expect(res).toStrictEqual<typeof res>(publicUserObject(res))
    })
})
