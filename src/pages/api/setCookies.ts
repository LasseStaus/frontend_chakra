import { NextApiRequest, NextApiResponse } from 'next'
import setCookies from './apihelpers/setCookies'
import cookie from 'cookie'

export type Tokens = {
  access_token: string
  refresh_token: string
}

// The cookie middleware will add the `set-cookie` header
const setCookiesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { access_token, refresh_token }: Tokens = req.body

  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('AT', String(access_token), {
        httpOnly: true,
        secure: true, // TO DO
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/'
      }),
      cookie.serialize('RT', String(refresh_token), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/'
      })
    ])
    res.status(200).end()
  } catch (error) {
    res.status(405).end()
  }
}

export default setCookiesHandler
