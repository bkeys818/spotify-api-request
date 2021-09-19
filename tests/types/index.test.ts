import { readFileSync } from 'fs'
import { dataPath } from '../global'
import { schemas } from './schemas'
import Ajv from 'ajv'

import { testToken, testRefreshToken } from '../global'

expect.extend({
    toMatchSchema(data: any, type: string, catigory = 'responses') {
        const $ref = `http://example.com/types/${catigory}.json#/definitions/${type}`
        const validate = ajv.getSchema($ref)
        if (!validate)
            throw new Error(`Couldn't find schema with $ref: ${$ref}`)

        const pass = validate(data)
        if (typeof pass != 'boolean')
            throw new Error('Unknown error during valdiation')
        let msg =
            this.utils.DIM_COLOR(`// ${$ref}`) +
            `\n${this.utils.matcherHint('toMatchSchema', undefined, 'schema', {
                isNot: this.isNot,
                promise: this.promise,
            })}\n`
        if (validate.errors) {
            validate.errors.forEach((error) => {
                msg +=
                    `\n  Error: ${this.utils.stringify(error)}` +
                    `\n  Revieved: ${this.utils.printReceived(
                        this.utils.stringify(data)
                    )}`
            })
        } else msg += `\n  Data matched schema`

        return {
            pass: pass,
            message: () => msg,
        }
    },
})
declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchSchema(type: string, catigory?: string): R
        }
    }
}

const ajv = new Ajv({ schemas: schemas })

const responses = JSON.parse(readFileSync(dataPath, 'utf-8'))

describe('Authorization types', () => {
    test.concurrent.each([
        ['Token', testToken],
        ['RefreshToken', testRefreshToken],
    ])('%s', (type, data) => {
        expect(data).toMatchSchema(type, 'auth')
    })
})

describe('Request Responses', () => {
    test.concurrent.each(
        Object.keys(responses)
            .filter((key) => responses[key])
            .map((key) => [key, responses[key]])
    )('%s', (type, data) => {
        expect(data).toMatchSchema(type)
    })
})
