export type Tokens = {
  access_token: string
  refresh_token: string
}

export const SetCookie = async (data: Tokens) =>
  await fetch('/api/setCookies', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => {
    if (!res.ok) {
      return new Error('cookie fail')
    } else {
      console.log('cookie success', res)
      return
    }
  })
