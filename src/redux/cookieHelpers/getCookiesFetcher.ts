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
  console.log('cookie success 1', responseData)

  if (responseData) {
    console.log('cookie success 2', responseData)
    return responseData
  } else {
    return new Error('cookie fail')
  }
}

// export const getCookieFetcher = async () => {
//   const response = await fetch('/api/getCookies', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     }
//   })

//   const responseData = await response.json()
//   if (response.ok) {
//     return new Error('cookie fail')
//   } else {
//     console.log('cookie success', responseData)
//     return responseData
//   }
