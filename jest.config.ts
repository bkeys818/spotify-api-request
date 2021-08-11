import type { Config } from '@jest/types'
import { config } from 'dotenv'
import authorize from './authorize'

export interface Globals {
    token: string
}

export default async (): Promise<Config.InitialOptions> => {
    config()
    await authorize()
    return {
        preset: 'ts-jest',
        collectCoverageFrom: ['**/src/**/*.ts'],
    }
}
