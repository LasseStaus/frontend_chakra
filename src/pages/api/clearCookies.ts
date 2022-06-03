import { NextApiRequest, NextApiResponse } from 'next'
import setCookies from './apihelpers/setCookies'
import cookie from 'cookie'

export type Tokens = {
  access_token: string
  refresh_token: string
}

// The cookie middleware will add the `set-cookie` header
const clearCookiesHandler = (res: NextApiResponse) => {
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('AT', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: -1, // 1 week
        sameSite: 'strict',
        path: '/'
      }),
      cookie.serialize('RT', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: -1, // 1 week
        sameSite: 'strict',
        path: '/'
      })
    ])
    res.status(200).end()
  } catch (error) {
    res.status(405).end()
  }
}

export default clearCookiesHandler
