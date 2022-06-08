import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export type Tokens = {
  access_token: string
  refresh_token: string
}

// The cookie middleware will clear the cookie
const clearCookiesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize('AT', '', {
        httpOnly: true,
        secure: true,
        maxAge: -1,
        sameSite: 'strict',
        path: '/'
      }),
      cookie.serialize('RT', '', {
        httpOnly: true,
        secure: true,
        maxAge: -1,
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
