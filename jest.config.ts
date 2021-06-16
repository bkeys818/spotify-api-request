import type { Config } from '@jest/types'
import { config } from 'dotenv'

import fetch from 'node-fetch'
import type { Token } from './src/authorize'

config()

export interface Globals {
    testData: {
        token: Token
    }
}

type JestConfig = Omit<Config.InitialOptions, 'globals'> & {
    globals: Pick<Config.InitialOptions, 'globals'> & Globals
}

export default  async (): Promise<JestConfig> => {
    return {
        preset: 'ts-jest',
        globals: {
            testData: {
                token: await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${Buffer.from(
                            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
                        ).toString("base64")}`,
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    body: encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials'),
                }).then(res => res.json())
            }
        },
        collectCoverageFrom: [ '**/src/**/*.ts' ]
    }
}