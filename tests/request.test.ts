import { request, requestWithURL } from '../src/request'
import { SpotifyError } from '../src/error'
// @ts-ignore
import type { Globals } from '../jest.config'

const token = (global as unknown as Globals).testData.token
const albumID = '7gsWAHLeT0w7es6FofOXk1'


test(`Function ${request.name} basic functionality`, async () => {
    await expect(request('Get an Album', {
        token: token,
        pathParameter: {
            "{id}": albumID
        }
    })).resolves.toHaveProperty('album_type', 'album')
})

test(`Function ${requestWithURL.name} basic functionality`, async () => {
    await expect(requestWithURL({
        url: `https://api.spotify.com/v1/albums/${albumID}` as `https://api.spotify.com/v1/albums/${string}`,
        method: 'GET',
        token: token
    })).resolves.toHaveProperty('album_type', 'album')
})

const messageFor = (type: SpotifyError['type']) => `SpotifyError - ${SpotifyError.Type[type]}`

test.concurrent('Invalid token throws Unauthorized error', async () => {
    const func = request('Get an Album', {
        token: 'Basic fdnjksanjkfsajfjs',
        pathParameter: {
            "{id}": albumID
        } 
    })
    await expect(func).rejects.toThrowError(SpotifyError)
    await expect(func).rejects.toThrowError(messageFor('authorization'))
})

test.concurrent('Inavalid ID throws Bad Request', async () => {
    const func = request('Get an Album', {
        token: token,
        pathParameter: {
            "{id}": 'jkfre3345'
        }
    })
    await expect(func).rejects.toThrowError(SpotifyError)
    expect(func).rejects.toThrowError(messageFor('request'))
})