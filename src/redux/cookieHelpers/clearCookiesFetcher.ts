export type Tokens = {
  access_token: string
  refresh_token: string
}

export const clearCookiesFetcher = async () => {

  const response = await fetch('/api/clearCookies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    return
  } else {
    return new Error('cookie clear fail')
  }
}
