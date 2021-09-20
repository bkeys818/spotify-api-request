import { readFileSync } from 'fs'
import { AnySchema, AnySchemaObject } from 'ajv'

function modifySchemaWithKey(
    schema: AnySchema,
    key: string,
    modify: (schema: AnySchemaObject) => AnySchemaObject
) {
    if (typeof schema == 'object')
        for (const schemaKey in schema) {
            // key being searched for
            if (schemaKey == key) schema = modify(schema)
            else if (schemaKey == 'extends') {
                schema[schemaKey].genericValues.map((schema: AnySchemaObject) =>
                    modifySchemaWithKey(schema, key, modify)
                )
            }

            // properties key
            else if (schemaKey == 'properties' || schemaKey == 'definitions') {
                for (const propKey in schema[schemaKey]) {
                    modifySchemaWithKey(schema[schemaKey][propKey], key, modify)
                }
            }
            // items key
            else if (
                schemaKey == 'items' ||
                schemaKey == 'then' ||
                schemaKey == 'else'
            ) {
                modifySchemaWithKey(schema[schemaKey], key, modify)
            }
        }
}

const paths = ['types/auth.json', 'types/objects.json', 'types/responses.json']
function compile(paths: string[]) {
    let schemas = paths.map(getSchema)

    let currentRoot: AnySchemaObject
    // extends
    for (const schema of schemas) {
        currentRoot = schema
        modifySchemaWithKey(schema, 'extends', extendSchema)
    }

    // remove custom keywords
    for (const schema of schemas) {
        ;['geneicKeys', 'generic'].forEach((key) =>
            modifySchemaWithKey(schema, key, (schema) => {
                delete schema[key]
                return schema
            })
        )
    }

    return schemas

    function getSchema(path: string) {
        let schema: AnySchemaObject

        try {
            schema = JSON.parse(readFileSync(path, 'utf-8'))
        } catch (err: any) {
            let msg: string
            if ('code' in err) {
                msg = `No file found at ${path}`
            } else {
                msg = 'File is an invalid JSON\n' + err.message
            }
            throw new Error(msg)
        }

        return schema
    }

    function findSchema($ref: string) {
        let schema = currentRoot
        let path = $ref

        if ($ref[0] != '#') {
            let [uri, hash] = $ref.split('#')
            if (!uri.startsWith('http://'))
                uri = 'http://example.com/types/' + uri
            let linkedSchema = schemas.find((schema) => schema.$id == uri)
            if (!linkedSchema)
                throw new Error(`No schema found for for uri (${uri}).`)
            else schema = linkedSchema

            path = '#' + hash
        }

        const steps = path.slice(2).split('/')
        for (const step of steps) {
            if (typeof schema == 'object' && step in schema)
                schema = schema[step]
            else {
                throw new Error(`URI $ref (${$ref}) doesn't point to anything`)
            }
        }

        return schema
    }

    function extendSchema(schema: AnySchemaObject): AnySchemaObject {
        let refrencedSchema = findSchema(schema.extends.$ref)
        if (refrencedSchema.extends)
            refrencedSchema = extendSchema(refrencedSchema)

        if ('properties' in refrencedSchema) {
            if ('genericValues' in schema.extends) {
                if (!refrencedSchema.genericKeys)
                    throw new Error(
                        `Can't use "genericValues" unless "$ref" point to a schema with "genericKeys"`
                    )

                modifySchemaWithKey(
                    refrencedSchema,
                    'generic',
                    (schemaWithGeneric) => {
                        const i = refrencedSchema.genericKeys.indexOf(
                            schemaWithGeneric.generic
                        )
                        const { generic, ...otherProps } = schemaWithGeneric
                        const value = schema.extends.genericValues![i]
                        return value ? { ...otherProps, ...value } : otherProps
                    }
                )
            }

            let propKeys = Object.keys(refrencedSchema.properties)
            if (schema.extends.omit)
                propKeys = propKeys.filter(
                    (key) => !schema.extends.omit!.includes(key)
                )

            const props: { [key: string]: { $ref: string } } = {}
            for (const key of propKeys) {
                props[key] = {
                    $ref: `${schema.extends.$ref}/properties/${key}`,
                }
            }
            schema.properties =
                'properties' in schema
                    ? {
                          ...props,
                          ...schema.properties,
                      }
                    : props
        }

        if ('required' in refrencedSchema) {
            const required = schema.extends.omit
                ? refrencedSchema.required.filter((key: string) =>
                      !schema.extends.omit.includes(key)
                  )
                : refrencedSchema.required
            schema.required =
                'required' in schema
                    ? [...schema.required, ...required]
                    : required
        }

        for (const key in refrencedSchema) {
            if (
                key == 'properties' ||
                key == 'required' ||
                key == 'genericKeys' ||
                key == 'geneic' ||
                Object.keys(schema).includes(key)
            )
                continue
            schema[key] = refrencedSchema[key]
        }

        delete schema.extends
        return schema
    }
}

export const schemas = compile(paths)
