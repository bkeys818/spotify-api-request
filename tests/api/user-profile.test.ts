import { getCurrentUsersProfile, getUsersProfile } from '../../src/api/user-profile'
import { privateUserObject, publicUserObject } from './objects'

// @ts-ignore
const token = global.token
export const userID = 'spotify'

test(getCurrentUsersProfile.name, async () => {
    const res = await getCurrentUsersProfile(token)

    expect(res).toStrictEqual<typeof res>(privateUserObject(res))
})

test(getUsersProfile.name, async () => {
    const res = await getUsersProfile(token, userID)
    
    expect(res).toStrictEqual<typeof res>(publicUserObject(res))
})