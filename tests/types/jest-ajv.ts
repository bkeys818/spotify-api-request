import Ajv, { ValidateFunction, ErrorObject } from 'ajv'
import { schemas } from '../../schemas'

export const ajv = new Ajv({ schemas: schemas })

expect.extend({
    toPassValidation(data: any, validate: ValidateFunction<any>) {
        let pass = false
        let msg =
            this.utils.DIM_COLOR(`// ${validate.schemaEnv.baseId}`) +
            `\n${this.utils.matcherHint('toMatchSchema', undefined, 'schema', {
                isNot: this.isNot,
                promise: this.promise,
            })}\n`

        const _pass = validate(data)
        if (typeof _pass == 'boolean') {
            pass = _pass
            if (validate.errors) {
                msg += logErrors(validate, data, this.utils)
            } else msg += `\n  Data matched schema`
        } else throw new Error('Unknown error during valdiation')

        return {
            pass: pass,
            message: () => msg,
        }
    },
})
declare global {
    namespace jest {
        interface Matchers<R> {
            toPassValidation(func: ValidateFunction<any>): R
        }
    }
}

type Utils = jest.MatcherUtils['utils']

function logErrors(validate: ValidateFunction<any>, data: any, utils: Utils) {
    let msg = ''
    for (const error of validate.errors!) {
        let instance = JSON.parse(JSON.stringify(data))
        if (error.instancePath) {
            const instancePath = error.instancePath.slice(1).split('/')
            for (const step of instancePath) {
                instance = instance[step]
            }
        }

        let [schema, schemaPath] = getSchemaAndPath(validate, error)

        schemaPath.pop()
        for (const step of schemaPath) {
            schema = (schema as Exclude<typeof schema, boolean>)[step]
        }

        let schemaStr = highlightKeyword(
            printObject(schema),
            error.keyword,
            utils.RECEIVED_COLOR
        )

        error.message = error.message ? `\n  Error: ${error.message}` : ''

        msg +=
            `\n  Path to error: ${error.schemaPath}` +
            error.message +
            `\n  Schema:\n    ${schemaStr}` +
            `\n  Recieved: ${printObject(instance, utils.printReceived)}\n`
    }
    return msg.slice(0, -2)
}

function getSchemaAndPath(validate: ValidateFunction<any>, error: ErrorObject) {
    if (typeof validate.schema == 'boolean')
        throw new Error(`Schema shouldn't be a boolean`)
    let schema = validate.schema

    let schemaPath = error.schemaPath.split('/')
    if (schemaPath[0] == '#') schemaPath.shift()
    else {
        const lastRootId = schemaPath
            .reverse()
            .find((step) => step.endsWith('.json'))
        schemaPath.reverse()
        if (lastRootId) {
            if (lastRootId != schemaPath[0]) {
                const i = schemaPath.indexOf(lastRootId)
                schemaPath.splice(0, i)
            }
            const $id = schemaPath.shift()

            const $refs = Object.keys(ajv.schemas).slice(1)
            const $ref = $refs.find(($ref) => $ref.endsWith('/' + $id))
            if ($ref) {
                const _schema = ajv.schemas[$ref]!.schema
                if (typeof _schema == 'boolean')
                    throw new Error(`Schema shouldn't be a boolean`)
                schema = _schema
            } else {
                throw new Error(`Couldn't find schema ending in "${$id}"`)
            }
        }
    }

    return [schema, schemaPath] as const
}

function printObject(
    value: any,
    print?: Utils['printExpected'] | Utils['printReceived']
) {
    if (typeof value == 'object') {
        for (const key in value) {
            if (typeof value[key] == 'object')
                for (const key1 in value[key]) {
                    if (Array.isArray(value[key][key1]))
                        value[key][key1] = '__fold__array__'
                    else if (typeof value[key][key1] == 'object')
                        value[key][key1] = '__fold__obj__'
                }
        }
    }
    let str = JSON.stringify(value, undefined, 2)
    str = str.replace(/__fold__array__/g, '[ ... ]')
    str = str.replace(/__fold__obj__/g, '{ ... }')
    str = str.split('\n').join('\n    ')

    if (print) {
        str = print(str)
        str = str.replace(/(?<!\\)\\"/g, '"')
        const quote1 = str.indexOf('"')
        const quote2 = str.lastIndexOf('"')
        str =
            str.slice(0, quote1) +
            str.slice(quote1 + 1, quote2) +
            str.slice(quote2 + 1)
    }

    return str
}

function highlightKeyword(
    str: string,
    keyword: string,
    highlight: Utils['RECEIVED_COLOR']
) {
    const spc = '      '
    const regexp = new RegExp(`^(${spc})("${keyword}")(.+)`, 'm')
    return str.replace(regexp, (_, $1, $2, $3) => $1 + highlight($2) + $3)
}
