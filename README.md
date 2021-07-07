<div align=center>
  <h1>Spotify API Request</h1>
  <p>A typescript supported wrapper for the Spotify web API</p>
</div>

<div align=center>
  <!-- TODO: - Codecov -->
  <!-- TODO: - Build -->
  <a href="https://www.npmjs.com/package/spotify-api-request">
    <img src="https://img.shields.io/npm/v/spotify-api-request" alt="NPM version">
  </a>
  <a href="https://www.npmjs.com/package/spotify-api-request">
    <img src="https://img.shields.io/npm/dt/spotify-api-request" alt="NPM download count">
  </a>
</div>
# Project status

#### This package is still in development! Use it at your own risk.

## Installation

Install using Yarn or NPM

```bash
yarn add spotify-api-request
```

## Usage

#### Authorization

Using this method will get you a valid token for the next hour. Tokens are used to make requests.

```typescript
import { authorize } from 'spotify-api-request'

async function getToken() {
  const clientId = '...'
  const clientSecret = '...'
  
  const token = await authorize({
    clientId: clientId,
    clientSecret: clientSecret
  })
  
  return token
}
```

Right now, authorization can only be done through Spotify's [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow). This requires client credentials which you can get at [Spotify's developer portal](https://developer.spotify.com/dashboard). If you'd prefer to get an access token another way, it can still be used to make request.  

#### Making requests

Now, we can use that token to make requests.

```typescript
import { requests } from 'spotify-api-request'

async function getShowEpisodes(showName: string) {
  const token = await getToken()

	const searchRes = await requests.searchforItem(token, {
    q: showName,
    type: 'show'
  })
  const showId = searchRes.items[0].id
  const shows = request.getShowEpisodes(token, showId)
  
  return shows
}
```

Every response is wrapped in a promise, so async/await is really helpful here.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure you update all test and documentation as appropriate.
