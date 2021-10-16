import { sendRequest } from '../global'
import type { Token, Responses } from 'spotify-objects'

// TODO - Make token optional
/**
 * Get the list of markets where Spotify is available.
 * @param token - A valid user access token or your client credentials.
 * @returns A list of the countries in which Spotify is available, identified by their [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) with additional country codes for special territories.
 */
export async function getAvailableMarkets(
	token: Token | string,
): Promise<Responses.getAvailableMarkets> {
	return await(
		await sendRequest({
			endpoint: 'markets',
			method: 'GET',
			token: token,
		})
	).json()
}
