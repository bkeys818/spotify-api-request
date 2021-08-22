import schemas from './schemas'
import { Unwrap, dataPath } from '../global'
import type * as requests from '../../src/requests'
import { readFileSync } from 'fs'

import Ajv from 'ajv'

const responses: {
    [key in keyof typeof requests]: any
} = JSON.parse(readFileSync(dataPath, 'utf-8'))

const ajv = new Ajv()

test.each(
    (Object.keys(responses) as (keyof typeof responses)[]).map((key) => [key])
)('%s', (key) => {
    const schema = schemas[key]
    const response = responses[key]

    if (!(schema || response)) {
        expect(schema).toBeUndefined()
        expect(response).toBeNull()
    } else {
        // @ts-ingore
        const validate = ajv.compile(schema as Exclude<typeof schema, null>)
        validate(response)

        expect(validate.errors).toBeNull()

        if (validate.errors) {
            const errors = validate.errors
            if (errors) {
                for (const error of errors) {
                    const path = error.instancePath
                        .slice(1, error.instancePath.length)
                        .split('/')

                    let name = key
                    let _schema = schema as Exclude<typeof schema, null> 
                    let invalidValue = response
                    for (const step of path) {
                        name += `.${step}`
                        _schema = _schema.properties[step]
                        invalidValue = invalidValue[step]
                    }

                    console.error(
                        `TypeError: ${error.keyword} error at %s${
                            error.message ? ` - ${error.message}.` : '.'
                        }\nSchema: %O\nValue: %O`,
                        name,
                        _schema,
                        invalidValue
                    )
                }
                process.exit(1)
            } else {
                console.error('Unknown error')
                process.exit(1)
            }
        }
    }
})
