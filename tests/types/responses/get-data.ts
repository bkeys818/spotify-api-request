import { config } from 'dotenv'
config()
import authorize from '../../../authorize'
import * as requests from '../../../src/requests'
import { writeFileSync } from 'fs'
import { params } from '../../global'
import { dataPath } from '.'

async function getData() {
    await authorize()
    const responses: { [key: string]: any } = {}
    for (const key in params) {
        const request = requests[key as keyof typeof requests]
        const param = params[key as keyof typeof params]
        if (param !== null) {
            try {
            // @ts-ignore
            responses[key] = await request(...param)
            } catch(err: any) {
                responses[key] = err.message
            }
        } else {
            responses[key] = param
        }
    }
    writeFileSync(dataPath, JSON.stringify(responses))
}

getData()