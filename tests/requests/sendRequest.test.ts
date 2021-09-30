import { sendRequest } from '../../src/global'
import fetch from 'node-fetch'
import { mocked } from 'ts-jest/utils'

jest.mock('node-fetch', () => ({
    default: jest.fn(),
    __esModule: true
}))

test.todo(sendRequest.name)
