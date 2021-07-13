export {}
// import { sendRequest } from '../request'
// import type { Token } from '../authorize'
// import type { CurrentlyPlayingContextObject } from './objects'


// /**
//  * Get information about the user’s current playback state, including track or episode, progress, and active device. 
//  * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.
//  * @param {Object} [options]
//  * @returns {Promise<CurrentlyPlayingContextObject>} The information returned is for the last known state, which means an inactive device could be returned if it was the last one to execute playback.
//  */
//  export async function getInformationAboutTheUsersCurrentPlayback(
// 	token: Token | string,
// 	options?: {
// 		/** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
// 		market?: string
// 		/** A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`. An unsupported type in the response is expected to be represented as `null` value in the `item` field. **Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new */
// 		additional_types?: string
// 	},
// ): Promise<CurrentlyPlayingContextObject> {
// 	return await(
// 		await sendRequest({
// 			endpoint: 'me/player',
// 			method: 'GET',
// 			token: Token | string,
// "queryParameter":{"market":"OPTIONS","additional_types":"OPTIONS"}
// 		})
// 	).json()
// }



// /**
//  * Transfer playback to a new device and determine if it should start playing.
//  * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>The access token must have been issued on behalf of a user.<br>The access token must have the `user-modify-playback-state` scope authorized in order to control playback.
//  * @param {Object} options
//  * @returns {}
//  */
// export async function transferUsersPlayback(
// 	token: Token | string,
// 	options: {
// 		/**
// 		 * An array containing the ID of the device on which playback should be started/transferred.
// 		 *
// 		 * Note: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`
// 		 */
// 		device_ids: [string]
// 		/**
// 		 * **true**: ensure playback happens on new device.
// 		 *
// 		 * **false** (or not provided): keep the current playback state.
// 		 */
// 		play?: boolean
// 	},
// ): Promise<RETURN> {
// 	return await(
// 		await sendRequest({
// 			endpoint: 'me/player',
// 			method: 'PUT',
// 			token: Token | string,
// "bodyParameter":{"device_ids":"OPTIONS","play":"OPTIONS"}
// 		})
// 	).json()
// }



// /**
//  * Get information about a user’s available devices.
//  * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of a user. The access token must have the `user-read-playback-state` scope authorized in order to read information.
//  * @returns {}
//  */
// export async function getUsersAvailableDevices(
// 	token: Token | string,
// ): Promise<RETURN> {
// 	return await(
// 		await sendRequest({
// 			endpoint: 'me/player/devices',
// 			method: 'GET',
// 			token: Token | string,

// 		})
// 	).json()
// }



// /**
//  * Get the object currently being played on the user’s Spotify account.
//  * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details. The access token must have been issued on behalf of a user. The access token must have the `user-read-currently-playing` and/or `user-read-playback-state` scope authorized in order to read information.
//  * @param {Object} options
//  * @returns {}
//  */
// export async function gettheUsersCurrentlyPlayingTrack(
// 	token: Token | string,
// 	options: {
// 		/** An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or the string `from_token`. Provide this parameter if you want to apply [Track Relinking](https://developer.spotify.com/documentation/general/guides/track-relinking-guide/). */
// 		market: string
// 		/** A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`. An unsupported type in the response is expected to be represented as `null` value in the `item` field. **Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future. In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `currently_playing_type` field. */
// 		additional_types?: string
// 	},
// ): Promise<RETURN> {
// 	return await(
// 		await sendRequest({
// 			endpoint: 'me/player/currently-playing',
// 			method: 'GET',
// 			token: Token | string,
// "queryParameter":{"market":"OPTIONS","additional_types":"OPTIONS"}
// 		})
// 	).json()
// }



// /**
//  * Start a new context or resume current playback on the user’s active device.
//  * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>The access token must have been issued on behalf of a user.<br>The access token must have the `user-modify-playback-state` scope authorized in order to control playback.
//  * @param {Object} [options]
//  * @returns {}
//  */
// export async function start/ResumeUsersPlayback(
// 	token: Token | string,
// 	options?: {
// 		/** The id of the device this command is targeting. If not supplied, the user’s currently active device is the target. */
// 		device_id?: string
// 		/** string */
// 		context_uri?: string
// 		/** Array of URIs */
// 		uris?: Array<string>
// 		/** object */
// 		offset?: object
// 		/** integer */
// 		position_ms?: number
// 	},
// ): Promise<RETURN> {
// 	return await(
// 		await sendRequest({
// 			endpoint: 'me/player/play',
// 			method: 'PUT',
// 			token: Token | string,
// "queryParameter":{"device_id":"OPTIONS"},"bodyParameter":{"context_uri":"OPTIONS","uris":"OPTIONS","offset":"OPTIONS","position_ms":"OPTIONS"}
// 		})
// 	).json()
// }



// /**
//  * Pause playback on the user’s account.
//  * @param {Token} token - A valid access token from the Spotify Accounts service: see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) for details.<br>The access token must have been issued on behalf of a user.
//  * @param {Object} [options]
//  * @returns {}
//  */
// export async function pauseUsersPlayback(
// 	token: Token | string,
// 	options?: {
// 		/** The id of the device this command is targeting. If not supplied, the user’s currently active device is the target. */
// 		device_id?: string
// 	},
// ): Promise<RETURN> {
// 	return await(
// 		await sendRequest({
// 			endpoint: 'me/player/pause',
// 			method: 'PUT',
// 			token: Token | string,
// "queryParameter":{"device_id":"OPTIONS"}
// 		})
// 	).json()
// }
