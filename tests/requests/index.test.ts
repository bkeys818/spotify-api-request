import * as requests from '../../src/requests'
import testData, { token, unmodifiedRes, ResponseKey } from './test-data'
import { params } from '../global'
import * as globalSrcUtils from '../../src/global'
import type { Response } from 'node-fetch'

const sendReq = jest.spyOn(globalSrcUtils, 'sendRequest')
beforeEach(() => {
    sendReq.mockClear()
})
afterAll(() => {
    sendReq.mockRestore()
})

describe.each(testData)('$name', ({ values }) => {
    for (const _key in values) {
        const key = _key as ResponseKey
        const value = values[key]!
        if (value == 'todo') {
            test.todo(key)
            continue
        }
        const reqeust = requests[key]
        const { endpoint, method, params: _params, response } = value
        const paramValues = _params(params[key].slice(1) as any)

        describe(reqeust, () => {
            sendReq.mockImplementation(() =>
                Promise.resolve({
                    status: 200,
                    json: () =>
                        Promise.resolve(response?.send ?? unmodifiedRes),
                } as Response)
            )

            for (const testName in paramValues) {
                const { send, expect: expectParams } = paramValues[testName]
                test(testName, () => {
                    // @ts-expect-error
                    const res = reqeust(token, ...send)

                    expect(sendReq).toBeCalledTimes(1)
                    expect(sendReq).toBeCalledWith<
                        Parameters<typeof globalSrcUtils.sendRequest>
                    >({
                        endpoint: endpoint,
                        method: method ?? 'GET',
                        token: token,
                        ...expectParams,
                    })

                    expect(res).resolves.toMatchObject(
                        response?.expect ?? unmodifiedRes
                    )
                })
            }
        })
    }
})
