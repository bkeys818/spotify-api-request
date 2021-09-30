import { sendRequest } from '../../src/global'
import fetch, { Response } from 'node-fetch'
import { mocked } from 'ts-jest/utils'

jest.mock('node-fetch', () => ({
    default: jest.fn(),
    __esModule: true,
}))

mocked(fetch).mockImplementation(() =>
    Promise.resolve({
        status: 200,
        json: () => Promise.resolve({}),
    } as Response)
)

test(sendRequest.name, async () => {
    const urlParam = {
        encoded: 'value%?:',
        string: 'text',
        number: 12,
        boolean: true,
        array: ['value%?:', 'text', 12, true],
    }
    const pathParams = { key: 'encode%?:' }
    const sent: Parameters<typeof sendRequest>[0] = {
        endpoint: `test/{${Object.keys(pathParams)[0]}}/send-request`,
        method: 'GET',
        token: 'abc',
        headers: { key: 'value' },
        pathParameter: pathParams,
        queryParameter: urlParam,
        bodyParameter: urlParam,
    }
    sendRequest(sent)
    const expectUrl = new URL(
        'https://api.spotify.com/v1/' +
            sent.endpoint.replace('{id}', encodeURIComponent(pathParams.key))
    )
    const { array, ...basicTypes } = urlParam
    for (const key in basicTypes) {
        const value = basicTypes[key as keyof typeof basicTypes]
        expectUrl.searchParams.set(key, value.toString())
    }
    expectUrl.searchParams.set(
        'array',
        array.map((value) => value.toString()).join(',')
    )

    const [url, init] = mocked(fetch).mock.calls[0]

    expect(url).toBe(expectUrl.href)
    expect(init?.method).toBe(sent.method)
    expect(init?.headers).toMatchObject({
        Authorization: `Bearer ${sent.token}`,
        ...sent.headers,
    })
    expect(init?.body).toBe(JSON.stringify(urlParam))
})
