import {
    RefreshToken,
    Token,
    Scope,
    createState,
    createCode,
    authorizeToken,
    authorizeRefreshToken,
    getRefreshToken,
} from '../../src'
import { token as globalToken, camelToSnakeCase } from '../global'
import { paramsFromBody } from './global'
import fetch from 'node-fetch'
import { mocked } from 'ts-jest/utils'

jest.mock('node-fetch', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const clientId = process.env.CLIENT_ID!
const clientSecret = process.env.CLIENT_SECRET!
const refreshToken = process.env.REFRESH_TOKEN!
const redirectUri = 'http://localhost:5050/callback'
const state = createState()
const code = createCode()
const scopes: Scope[] = [
    'app-remote-control',
    'user-library-modify',
    'user-read-playback-state',
]
const testToken: Token = {
    access_token: globalToken,
    expires_in: 3600,
    token_type: 'Bearer',
}
const testRefreshToken: RefreshToken = {
    ...testToken,
    refresh_token: refreshToken,
}

const basicParams = {
    clientId: clientId,
    redirectUri: redirectUri,
}

describe.each([
    { method: authorizeToken },
    {
        method: authorizeRefreshToken,
        otherTest: (redir: jest.Mock<void, [_: string]>) =>
            [
                [
                    'Successful call using PKCE',
                    () => {
                        const params: Parameters<
                            typeof authorizeRefreshToken
                        >[0] = {
                            ...basicParams,
                            codeChallenge: 'abc',
                        }
                        authorizeRefreshToken(params, redir)

                        const search = new URL(redir.mock.calls[0][0])
                            .searchParams
                        for (const _key in params) {
                            const key = camelToSnakeCase(_key)
                            expect(search.has(key)).toBeTruthy()
                            expect(search.get(key)).toBe(
                                params[_key as keyof typeof params]
                            )
                        }
                    },
                ],
            ] as Parameters<jest.It>[],
    },
])('$method.name', ({ method, otherTest }) => {
    const redir = jest.fn((_: string) => {})
    beforeEach(() => {
        redir.mockReset()
    })

    test('Successful call', () => {
        const params: Parameters<typeof method>[0] = {
            ...basicParams,
            scopes: scopes,
            showDialog: true,
            state: state,
        }
        method(params, redir)

        expect(redir).toHaveBeenCalledTimes(1)

        const url = new URL(redir.mock.calls[0][0])
        expect(url.origin + url.pathname).toBe(
            'https://accounts.spotify.com/authorize'
        )

        const search = url.searchParams
        expect(search.has('scope')).toBeTruthy()
        expect(search.get('scope')).toBe(scopes.join())
        delete params.scopes
        for (const _key in params) {
            const key = camelToSnakeCase(_key)
            expect(search.has(key)).toBeTruthy()
            expect(search.get(key)).toBe(
                params[_key as keyof typeof params]?.toString()
            )
        }
    })

    test('No redirect', () => {
        expect(() => {
            authorizeToken(basicParams)
        }).toThrowError(/token\/refresh-token/)
    })

    if (otherTest)
        otherTest(redir).forEach((params) => {
            test(...params)
        })
})

describe(getRefreshToken, () => {
    const hashCode = 'abc'
    const hash = (withState?: true) => {
        const obj: any = { code: hashCode }
        if (withState) obj.state = state
        return new URLSearchParams(obj).toString()
    }

    beforeAll(() => {
        mocked(fetch).mockImplementation(
            (): Promise<any> =>
                Promise.resolve({
                    status: 400,
                    ok: true,
                    json: () => Promise.resolve(testRefreshToken),
                })
        )
    })
    beforeEach(() => {
        mocked(fetch).mockClear()
    })

    test('Successful call', async () => {
        const params = {
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
            state: state,
        }
        const refreshToken = await getRefreshToken(params, hash(true))
        expect(refreshToken).toStrictEqual(testRefreshToken)
        expect(fetch).toHaveBeenCalledTimes(1)

        const fetchParams = mocked(fetch).mock.calls[0]
        expect(fetchParams[0]).toBe('https://accounts.spotify.com/api/token')

        expect(fetchParams[1]?.body).toBeTruthy()
        const body = paramsFromBody(fetchParams[1]!.body as string)
        const match: typeof body = {
            ...params,
            code: hashCode,
            grantType: 'authorization_code'
        }
        delete match.state

        expect(body).toStrictEqual(match)
    })

    test('Successful call using PKCE', async () => {
        const params = {
            clientId: clientId,
            codeVerifier: code.code_verifier,
            redirectUri: redirectUri,
        }
        const refreshToken = await getRefreshToken(params, hash())
        expect(refreshToken).toStrictEqual(testRefreshToken)
        expect(fetch).toHaveBeenCalledTimes(1)

        const fetchParams = mocked(fetch).mock.calls[0]
        expect(fetchParams[1]?.body).toBeTruthy()
        const body = paramsFromBody(fetchParams[1]!.body as string)
        expect(body).toStrictEqual({
            ...params,
            code: hashCode,
            grantType: 'authorization_code'
        })
    })

    test.todo('Error in hash')
    test.todo('No code in hash')
    test.todo('Error from spotify')

    afterAll(() => {
        mocked(fetch).mockRestore()
    })
})


