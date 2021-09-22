import { responses } from '../responses'
import { schemas } from '../../schemas'
import Ajv, { ValidateFunction } from 'ajv'

import { testToken, testRefreshToken } from '../global'

const ajv = new Ajv({ schemas: schemas })

function logErrors(
    validate: ValidateFunction<any>,
    data: any,
    utils: jest.MatcherUtils['utils']
) {
    return validate
        .errors!.map((error) => {
            let instance = JSON.parse(JSON.stringify(data))
            const instancePath = error.instancePath.slice(1).split('/')
            for (const step of instancePath) {
                instance = instance[step]
            }

            let schema: typeof validate.schema | undefined
            if (error.schemaPath.startsWith('#/definitions')) {
                const typePath = error.schemaPath.slice(
                    0,
                    error.schemaPath.indexOf('/', 14)
                )
                const keys = Object.keys(ajv.schemas).slice(1)
                for (const key of keys) {
                    const _schema = ajv.getSchema(key + typePath)?.schema
                    if (_schema) {
                        schema = _schema
                        break
                    }
                    error.schemaPath =
                        '#' + error.schemaPath.slice(typePath.length)
                }
            } else schema = validate.schema

            if (!schema)
                return `\n  Error: Couldn't find schema a path: ${error.schemaPath}`

            const schemaPath = error.schemaPath.slice(2).split('/')
            schemaPath.pop()
            for (const step of schemaPath) {
                schema = (schema as Exclude<typeof schema, boolean>)[step]
            }

            let schemaStr =
                '    ' +
                JSON.stringify(schema, null, 2)
                    .replace(
                        new RegExp(`^  "${error.keyword}"`, 'm'),
                        '  ' + utils.RECEIVED_COLOR(`"${error.keyword}"`)
                    )
                    .split('\n')
                    .join('\n    ')

            error.message = error.message ? `\n  Error: ${error.message}` : ''

            return (
                `\n  Path to error: ${error.schemaPath}` +
                error.message +
                `\n  Schema:\n${schemaStr}` +
                `\n  Recieved: ${utils.printReceived(instance)}`
            )
        })
        .join('\n')
}
expect.extend({
    toMatchSchema(data: any, type: string, catigory = 'responses') {
        const $ref = `http://example.com/types/${catigory}.json#/definitions/${type}`
        let pass = false
        let msg =
            this.utils.DIM_COLOR(`// ${$ref}`) +
            `\n${this.utils.matcherHint('toMatchSchema', undefined, 'schema', {
                isNot: this.isNot,
                promise: this.promise,
            })}\n`

        const validate = ajv.getSchema($ref)
        if (validate) {
            const _pass = validate(data)
            if (typeof _pass == 'boolean') {
                pass = _pass
                if (validate.errors) {
                    msg += logErrors(validate, data, this.utils)
                } else msg += `\n  Data matched schema`
            } else throw new Error('Unknown error during valdiation')
        } else msg += `\n  Error: Couldn't find schema for type (${type})`

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
        (Object.keys(responses) as (keyof typeof responses)[])
            .filter((key) => responses[key])
            .map((key) => [key, responses[key]])
    )('%s', (type, data) => {
        if (typeof data == 'string')
            expect(data).toBeFalsy()
        expect(data).toMatchSchema(type)
    })
})
