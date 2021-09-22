import { readFileSync } from 'fs'
import type * as requests from '../../src/requests'

export const dataPath = 'tests/responses/data.json'

export const responses: {
    [key in keyof typeof requests]: string | null | { [key: string]: any }
} = JSON.parse(readFileSync(dataPath, 'utf-8'))
