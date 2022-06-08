export type Tokens = {
  access_token: string
  refresh_token: string
}

export const getCookieFetcher = async () => {
  try {
    const response = await fetch('/api/getCookies', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const responseData = await response.json()

    if (responseData) {
      return responseData
    } else {
      return new Error('cookie GET fail')
    }
  } catch (error) {
    return false
  }
}
