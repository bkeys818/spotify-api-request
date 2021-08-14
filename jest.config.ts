import type { Config } from '@jest/types'
import { config } from 'dotenv'
import authorize from './authorize'
import { writeFileSync } from 'fs'

export interface Globals {
    token: string
}

function vsCodeJestExtensionSettings() {
    const settings: Config.InitialOptions = {}
    // Doesn't run test in "./tests/requests"
    if ('VSCODE_PID' in process.env && process.env.XPC_SERVICE_NAME !== '0') {
        settings.testPathIgnorePatterns = [ "<rootDir>/tests/requests/" ]
    }
    return settings
}

export default async (): Promise<Config.InitialOptions> => {
    config()
    await authorize()
    return {
        ...vsCodeJestExtensionSettings(),
        preset: 'ts-jest',
        collectCoverageFrom: ['**/src/**/*.ts'],
    }
}
