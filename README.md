<div align=center>
  <h1>Spotify API Request</h1>
  <p>A typescript supported wrapper for the Spotify web API</p>
</div>

<div align=center>
  <a href="https://github.com/bkeys818/spotify-api-request/actions/workflows/tests.yml">
    <img src="https://github.com/bkeys818/spotify-api-request/actions/workflows/tests.yml/badge.svg" alt="Build Status">
  </a>
  <a href="https://www.npmjs.com/package/spotify-api-request/v/2.0.1">
    <img src="https://img.shields.io/bundlephobia/min/spotify-api-request/2.0.1?logoColor=blue" alt="NPM version">
  </a>
  <a href="https://www.npmjs.com/package/spotify-api-request/v/2.0.1">
    <img src="https://img.shields.io/npm/dt/spotify-api-request" alt="NPM download count">
  </a>
</div>

## Installation

Install using Yarn or NPM

```bash
yarn add spotify-api-request
```

## Authorization

Tokens are used to make requests. This method will get you a valid token for the next hour. There are four methods authorization (described in [documentation](https://github.com/bkeys818/spotify-api-request/wiki/Authorization)).

```ts
import { getToken } from 'spotify-api-request'

const token = await getToken({
  clientId: clientId,
  clientSecret: clientSecret
})
```

## Making requests

Now, we can use that token to make requests.

```ts
import { searchForItem } from 'spotify-api-request'

async function searchForShow(showName: string) {
  const token = await getToken()

	const searchRes = await searchForItem(token, {
    q: showName,
    type: 'shows'
  })
  
  return searchRes.shows.items
}
```

Every response is wrapped in a promise, so async/await is really helpful here.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure you update all test and documentation as appropriate.
