import { Name } from '../../src/api/albums'
import { TestDataRow, sendRequest, pagingObject } from './global'
import { albumObject } from '../spotify-objects'

const albumIDs = ['7gsWAHLeT0w7es6FofOXk1']


test.concurrent.each([
    [
        'Get Multiple Albums',
        {
            queryParameter: {
                ids: albumIDs.join(',')
            }
        },
        async response => {
            await expect(response).toMatchObject<typeof response>({
                albums: response.albums.map(album => 
                    (album === null ? null : albumObject(album))
                )
            })
        }
    ] as TestDataRow<'Get Multiple Albums'>,
    [
        'Get an Album',
        {
            pathParameter: {
                "{id}": albumIDs[0]
            }
        },
        async response => {
            await expect(response).toMatchObject<typeof response>(albumObject(response))
        }
    ] as TestDataRow<'Get an Album'>,
    [
        "Get an Album's Tracks",
        {
            pathParameter: {
                "{id}": albumIDs[0]
            }
        },
        async response => {
            await expect(response).toMatchObject<typeof response>(
                pagingObject('track', response, response.items.map(() =>
                    expect.any(Object)
                ))
            )
        }
    ] as TestDataRow<"Get an Album's Tracks">,
] as TestDataRow<Name>[])('Response for "%s"', async (name, request, tests) => {
    await tests(await sendRequest(name, request))
})