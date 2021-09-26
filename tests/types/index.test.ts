import { responses } from './responses'
import { ajv } from './jest-ajv'
import { testToken, testRefreshToken } from '../global'

describe('Authorization types', () => {
    test.concurrent.each([
        ['Token', testToken],
        ['RefreshToken', testRefreshToken],
    ])('%s', (type, data) => {
        const $id = `http://example.com/schemas/auth/${type}.json`
        const validate = ajv.getSchema($id)
        expect(validate).toBeDefined()

        expect(data).toPassValidation(validate!)
    })
})

describe('Response Types', () => {
    const testData = (Object.keys(responses) as (keyof typeof responses)[])
        .filter((key) => responses[key])
        .map((key) => [key, responses[key]] as const)

    test.concurrent.each(testData)('%s', (type, data) => {
        // get-data throw error
        expect(data).not.toEqual(expect.any(String))

        const $id = `http://example.com/schemas/responses/${type}.json`
        const validate = ajv.getSchema($id)
        expect(validate).toBeDefined()

        // request returns nothing
        if (data === null)
            expect(validate!.schema).toMatchObject({ type: 'null' })
        else expect(data).toPassValidation(validate!)
    })
})
