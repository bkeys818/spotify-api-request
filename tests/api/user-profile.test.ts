import { getCurrentUserProfile, getUserProfile } from '../../src/api/user-profile'
import { privateUserObject, publicUserObject } from './objects'

// @ts-ignore
const token = global.token
export const userID = 'spotify'

test(getCurrentUserProfile.name, async () => {
    const res = await getCurrentUserProfile(token)

    expect(res).toStrictEqual<typeof res>(privateUserObject(res))
})

test(getUserProfile.name, async () => {
    const res = await getUserProfile(token, userID)
    
    expect(res).toStrictEqual<typeof res>(publicUserObject(res))
})