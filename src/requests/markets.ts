import { sendRequest } from '../send-request'
import type { Token } from '../authorize'

/**
 * Get the list of markets where Spotify is available.
 * @param {Token} token - A valid user access token or your client credentials.
 * @returns {Promise<{ markets: string[] }>} A list of the countries in which Spotify is available, identified by their [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) with additional country codes for special territories.
 */
export async function getAvailableMarkets(
	token: Token | string,
): Promise<{ markets: string[] }> {
	return await(
		await sendRequest({
			endpoint: 'markets',
			method: 'GET',
			token: token,
		})
	).json()
}