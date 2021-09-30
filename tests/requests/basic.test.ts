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
        const { endpoint, params: _params, response } = value
        const param = params[key]
        if (param === null) {
            test.todo(key)
            continue   
        }
        const paramValues = _params(param.slice(1) as any)

        describe(reqeust, () => {
            sendReq.mockImplementation(() =>
                Promise.resolve({
                    status: 200,
                    json: () =>
                        Promise.resolve(response?.send ?? unmodifiedRes),
                } as Response)
            )

            for (const testName in paramValues) {
                const {send: sendParams, expect: expectParams} = paramValues[testName] ?? { send: [], expect: {} }
                test(testName, () => {
                    // @ts-expect-error
                    const res = reqeust(token, ...sendParams)

                    expect(sendReq).toBeCalledTimes(1)
                    expect(sendReq).toBeCalledWith<
                        Parameters<typeof globalSrcUtils.sendRequest>
                    >({
                        endpoint: endpoint,
                        method: 'GET',
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
