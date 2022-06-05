export type Tokens = {
  access_token: string
  refresh_token: string
}

export const setCookieFetcher = async (data: Tokens) => {
  const response = await fetch('/api/setCookies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    console.log('cookie SET success ')
    return
  } else {
    return new Error('cookie SET fail')
  }
}
