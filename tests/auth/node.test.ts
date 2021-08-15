import {
    authorizeToken,
    authorizeRefreshToken,
    getRefreshToken,
    getToken,
} from '../../src'
import {
    clientId,
    clientSecret,
    refreshToken,
    redirectUri,
    state,
    code,
    scopes,
    testToken,
    testRefreshToken,
    camelToSnakeCase,
    paramsFromBody,
} from '../global'
import fetch from 'node-fetch'
import { mocked } from 'ts-jest/utils'

jest.mock('node-fetch', () => ({
    __esModule: true,
    default: jest.fn(),
}))

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
            grantType: 'authorization_code',
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
            grantType: 'authorization_code',
        })
    })

    describe('Errors', () => {
        const validParams = {
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUri: redirectUri,
            state: state
        }

        test('Error in hash', async () => {
            const errorMsg = 'Example error msg'
            const errorHash = new URLSearchParams({
                error: errorMsg,
                state: state
            }).toString()
            expect(async () => {
                await getRefreshToken(validParams, errorHash)
            }).rejects.toThrowError(new RegExp(errorMsg))
        })
    
        test('Invalid hash', async () => {
            expect(async () => {
                await getRefreshToken(validParams, '')
            }).rejects.toThrowError(/Missing hash value/)
        })
    
        test('Error from spotify', async () => {
            const errorMsg = 'Example error msg'
            mocked(fetch).mockImplementation((): any => Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({
                    error: 'invalid_client',
                    error_description: errorMsg
                })
            }))
            expect(async () => {
                await getRefreshToken(validParams, hash(true))
            }).rejects.toThrowError(new RegExp(errorMsg))
        })
    })

    afterAll(() => {
        mocked(fetch).mockRestore()
    })
})

describe(getToken, () => {
    describe('Overload 1 & 2', () => {
        beforeAll(() => {
            mocked(fetch).mockImplementation((): any =>
                Promise.resolve({
                    status: 400,
                    ok: true,
                    json: () => Promise.resolve(testToken),
                })
            )
        })
        beforeEach(() => {
            mocked(fetch).mockClear()
        })

        test.each([
            [
                'Overload 1 - Successful call (using secret)',
                {
                    clientId: clientId,
                    clientSecret: clientSecret,
                    refreshToken: refreshToken,
                },
            ],
            [
                'Overload 1 - Successful call (pkce refreshToken)',
                { clientId: clientId, refreshToken: refreshToken },
            ],
            [
                'Overload 2 - Successful call',
                { clientId: clientId, clientSecret: clientSecret },
            ],
        ])('%s', async (_, params) => {
            const token = await getToken(params as any)

            expect(fetch).toBeCalledTimes(1)
            expect(token).toStrictEqual(testToken)

            const init = mocked(fetch).mock.calls[0][1]
            expect(init?.body).toBeTruthy()

            const body = new URLSearchParams(init!.body as string)

            let grantType
            if ('refreshToken' in params) {
                expect(body.has('refresh_token')).toBeTruthy()
                expect(body.get('refresh_token')).toBe(refreshToken)
                grantType = 'refresh_token'
            } else grantType = 'client_credentials'
            expect(body.has('grant_type')).toBeTruthy()
            expect(body.get('grant_type')).toBe(grantType)

            expect(init?.headers).toHaveProperty(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )

            if ('clientSecret' in params) {
                expect(init?.headers).toHaveProperty(
                    'Authorization',
                    expect.stringMatching(/Basic .+/)
                )
                let auth: string = (init!.headers as any).Authorization.slice(6)
                auth = Buffer.from(auth, 'base64').toString()
                expect(auth).toBe(`${clientId}:${clientSecret}`)
            } else {
                expect(body.has('client_id')).toBeTruthy()
                expect(body.get('client_id')).toBe(clientId)
            }
        })

        test('Spotify error', async () => {
            const errorMsg = 'Example error msg'
            mocked(fetch).mockImplementation((): any => Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({
                    error: 'invalid_client',
                    error_description: errorMsg
                })
            }))
            expect(async () => {
                await getToken({
                    clientId: clientId,
                    clientSecret: clientSecret
                })
            }).rejects.toThrowError(new RegExp(errorMsg))
        })

        afterAll(() => {
            mocked(fetch).mockRestore()
        })
    })

    describe('Overload 3', () => {
        const hash = new URLSearchParams({
            ...testToken,
            expires_in: testToken.expires_in.toString(),
            state: state,
        }).toString()

        test.concurrent('Successful call', () => {
            const token = getToken(state, hash)
            expect(token).toStrictEqual(testToken)
        })

        test.concurrent('No hash', () => {
            expect(() => {
                getToken(state)
            }).toThrowError(/Missing hash value/)
        })

        test.concurrent('Error in hash', () => {
            const errorMsg = 'Example error msg'
            const errorHash = new URLSearchParams({
                error: errorMsg,
                state: state
            }).toString()
            expect(() => {
                getToken(state, errorHash)
            }).toThrowError(new RegExp(errorMsg))
        })

        test.concurrent('No state', () => {
            expect(() => {
                getToken(undefined, hash)
            }).toThrowError(/No state provided/)
        })

        test.concurrent('Invalid state', () => {
            expect(() => {
                getToken('abc', hash)
            }).toThrowError(/State value doesn't match/)
        })
    })
})
