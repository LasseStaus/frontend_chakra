import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'

export type Tokens = {
  access_token: string
  refresh_token: string
}

export const getCookieFetcher = async () => {
  const response = await fetch('/api/getCookies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  const responseData = await response.json()

  if (responseData) {
    console.log('cookie GET success', responseData)
    return responseData
  } else {
    return new Error('cookie GET fail')
  }
}
