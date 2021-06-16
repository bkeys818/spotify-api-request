import { request } from '../src'
import { SpotifyError } from '../src/error'
import type { Globals } from '../jest.config'

const token = (global as unknown as Globals).testData.token
const albumID = '7gsWAHLeT0w7es6FofOXk1'

test(`Function ${request.name} by name`, async () => {
    const req = request({
        name: 'Get an Album',
        token: token,
        pathParameter: {
            '{id}': albumID,
        },
    })
    await expect(req).resolves.toHaveProperty('album_type', 'album')
})

test(`Function ${request.name} by url`, async () => {
    const req = request({
        url: `https://api.spotify.com/v1/albums/${albumID}`,
        token: token,
        method: 'GET'
    })
    await expect(req).resolves.toHaveProperty('album_type', 'album')
})

const messageFor = (type: SpotifyError['type']) => `SpotifyError - ${SpotifyError.Type[type]}`

test.concurrent('Invalid token throws Unauthorized error', async () => {
    const req = request({
        name: 'Get an Album',
        token: 'Basic fdnjksanjkfsajfjs',
        pathParameter: {
            "{id}": albumID
        }
    })
    await expect(req).rejects.toThrowError(SpotifyError)
    await expect(req).rejects.toThrowError(messageFor('authorization'))
})

test.concurrent('Inavalid ID throws Bad Request', async () => {
    const req = request({
        name: 'Get an Album',
        token: token,
        pathParameter: {
            "{id}": 'jkfre3345'
        }
    })
    await expect(req).rejects.toThrowError(SpotifyError)
    expect(req).rejects.toThrowError(messageFor('request'))
})
