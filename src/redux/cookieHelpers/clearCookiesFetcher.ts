export type Tokens = {
  access_token: string
  refresh_token: string
}

export const clearCookiesFetcher = async () => {
  console.log('in clearcookies fethcer')

  const response = await fetch('/api/clearCookies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    console.log('cookie CLEAR success')
    return
  } else {
    return new Error('cookie clear fail')
  }
}
