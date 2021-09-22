import { readFileSync, readdirSync } from 'fs'
import { Schema, SchemaObject } from 'ajv'

function formatSchemas() {
    const schemaMap: { [key: string]: SchemaObject } = {}

    readdirSync('schemas', 'utf-8')
        .filter((path) => path.endsWith('.json'))
        .forEach((path) => {
            const str = readFileSync(`schemas/` + path, 'utf-8')
            const typeSchemas = JSON.parse(str) as SchemaObject[]

            for (const type in typeSchemas) {
                const schema = typeSchemas[type]

                const category = path.slice(0, -5)

                schema.$id = `http://example.com/schemas/${category}/${type}.json`
                schemaMap[schema.$id] = schema
            }
        })

    let currentSchema: CustomSchema

    // extends
    for (const key in schemaMap) {
        const schema = schemaMap[key]
        if (typeof schema == 'object') {
            currentSchema = schema
            forSchemaWithKey(schema, 'extends', extendSchema)
        }
    }

    // remove custom keywords
    for (const _key in schemaMap) {
        ;['genericKeys', 'generic'].forEach((key) =>
            forSchemaWithKey(schemaMap[_key], key, (schema) => {
                delete schema[key]
                return schema
            })
        )
    }

    return Object.values(schemaMap)

    function findSchema($ref: string) {
        let ref = $ref

        if (ref.includes('../')) {
            if (!currentSchema) throw new Error(`currentSchema is not defined`)
            let url = new URL(currentSchema.$id!)
            const steps = url.pathname.slice(1).split('/')
            steps.pop()
            while (ref.startsWith('../')) {
                ref = ref.slice(3)
                steps.pop()
            }
            ref = steps.join('/') + '/' + ref
        }

        const ids = Object.keys(schemaMap)
        const id = ids.find((id) => id.endsWith('/' + ref))

        if (!id)
            throw new Error(`Can't find schema that points to $ref (${$ref})`)

        const schema = schemaMap[id]
        if (typeof schema == 'boolean')
            throw new Error(`$ref (${ref}) can't point to a boolean schema`)
        return schema
    }

    function extendSchema(schema: CustomSchema) {
        const info = schema.extends!
        delete schema.extends

        const refrencedSchema = findSchema(info.$ref)
        if (refrencedSchema.extends) extendSchema(refrencedSchema)

        if ('properties' in refrencedSchema) {
            if ('genericValues' in info) {
                if (!refrencedSchema.genericKeys)
                    throw new Error(
                        `Can't use "genericValues" unless "$ref" point to a schema with "genericKeys"`
                    )

                forSchemaWithKey(
                    refrencedSchema,
                    'generic',
                    (schemaWithGeneric) => {
                        const i = refrencedSchema.genericKeys!.indexOf(
                            schemaWithGeneric.generic
                        )
                        const { generic, ...otherProps } = schemaWithGeneric
                        const value = info.genericValues![i]
                        return value ? { ...otherProps, ...value } : otherProps
                    }
                )
            }

            let propKeys = Object.keys(refrencedSchema.properties)
            if (info.omit)
                propKeys = propKeys.filter((key) => !info.omit!.includes(key))

            const props: { [key: string]: { $ref: string } } = {}
            for (const key of propKeys) {
                props[key] = {
                    $ref: `${info.$ref}#/properties/${key}`,
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
            const required = info.omit
                ? refrencedSchema.required.filter(
                      (key: string) => !info.omit!.includes(key)
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
                key == '$id' ||
                key == 'genericKeys' ||
                key == 'geneic' ||
                Object.keys(schema).includes(key)
            )
                continue
            schema[key] = refrencedSchema[key]
        }

        return schema
    }
}

/**
 * Searches through the schema (and all it's properties) for the key. When an object with that key is found, it's run thought the callback function.
 * @param schema The schema to search through
 * @param key The key to search for
 * @param callbackfn The function to run on any object with the key.
 */
function forSchemaWithKey<K extends string>(
    schema: Schema,
    key: K,
    callbackfn: (
        // prettier-ignore
        schema: CustomSchema & { [key in K]: K extends keyof CustomSchema ? Exclude<CustomSchema[K], undefined> : any }
    ) => CustomSchema | void
) {
    if (typeof schema == 'object')
        for (const schemaKey in schema) {
            // key being searched for
            if (schemaKey == key) {
                const _schema = callbackfn(schema as any)
                if (_schema) schema = _schema
            } else if (schemaKey == 'extends') {
                ;(schema.extends as ExtendsSchema).genericValues?.map(
                    (schema) => forSchemaWithKey(schema, key, callbackfn)
                )
            }
            // properties key
            else if (schemaKey == 'properties' || schemaKey == 'definitions') {
                for (const propKey in schema[schemaKey]) {
                    forSchemaWithKey(
                        schema[schemaKey][propKey],
                        key,
                        callbackfn
                    )
                }
            }
            // items key
            else if (
                schemaKey == 'items' ||
                schemaKey == 'then' ||
                schemaKey == 'else'
            ) {
                forSchemaWithKey(schema[schemaKey], key, callbackfn)
            }
        }
}

interface ExtendsSchema {
    $ref: string
    omit?: string[]
    genericValues?: CustomSchema[]
}
interface CustomSchema extends SchemaObject {
    extends?: ExtendsSchema
    genericKeys?: string[]
    generic?: string
}

export const schemas = formatSchemas()
