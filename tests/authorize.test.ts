import { authorize } from '../src'
import type { Token } from '../src/authorize'
import { SpotifyError } from '../src/error'

test.concurrent('Returns valid token', async () => {
    await expect(
        authorize({
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        })
    ).resolves.toEqual<Token>({
        access_token: expect.any(String),
        token_type: 'Bearer',
        expires_in: expect.any(Number),
    })
})

test.concurrent(`Throws ${SpotifyError.name} for invalid client`, async () => {
    await expect(
        authorize({
            clientID: 'fd87fa7sfg7sag',
            clientSecret: 'fjn394fu42hf30sf8ds',
        })
    ).rejects.toThrowError('Invalid client')
})
