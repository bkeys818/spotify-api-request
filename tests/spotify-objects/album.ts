import * as global from './global'

export function simplifiedAlbumObject(value: SimplifiedAlbumObject): SimplifiedAlbumObject {
    ;['available_markets', 'artists', 'images'].forEach(prop => {
        expect(value).toHaveProperty(prop, expect.any(Array))
    })

    const returnValue: typeof value = {
        ...global.contextObject('album'),
        album_type: expect.stringMatching(/album|single|compilation/),
        // TODO: SimplifiedArtistObjecgt
        artists: expect.any(Array),
        available_markets: value.available_markets.map(() => expect.stringMatching(/[A-Z]{2}/)),
        id: expect.any(String),
        images: value.images.map(global.imageObject),
        name: expect.any(String),
        release_date: expect.stringMatching(/\d{4}(-\d{2}(-\d{2})?)?/),
        release_date_precision: expect.stringMatching(/year|month|day/),
        total_tracks: expect.any(Number),
    }

    if ('album_group' in value && value.album_group)
        returnValue.album_group = expect.stringMatching(/album|single|compilation|appears_on/)
    if ('restrictions' in value && value.restrictions)
        returnValue.restrictions = expect.objectContaining<RestrictionObject>({
            reason: expect.stringMatching(/market|product|explicit/)
        })

    return returnValue
}

export const albumObject = (value: AlbumObject): AlbumObject => ({
    ...simplifiedAlbumObject(value),
    copyrights: value.copyrights.map(() => global.copyrightObject),
    external_ids: global.externalIdObject(value.external_ids),
    genres: value.genres.map(() => expect.any(String)),
    label: expect.any(String),
    popularity: expect.any(Number),
    // TODO: TrackObject
    tracks: expect.any(Object)
})