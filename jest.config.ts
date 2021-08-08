import type { Config } from '@jest/types'
import { config } from 'dotenv'
import authorize from './authorize'

export interface Globals {
    token: string
}

type JestConfig = Omit<Config.InitialOptions, 'globals'> & {
    globals: Pick<Config.InitialOptions, 'globals'> & Globals
}

export default async (): Promise<JestConfig> => {
    config()
    await authorize()
    return {
        preset: 'ts-jest',
        globals: {
            token: process.env.ACCESS_TOKEN!,
        },
        collectCoverageFrom: ['**/src/**/*.ts'],
    }
}
