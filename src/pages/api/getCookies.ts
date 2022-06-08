import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export type Tokens = {
  access_token: string
  refresh_token: string
}

// The cookie middleware will get the cookie from req.header
const getCookiesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.headers.cookie) {
      return res.end()
    }

    const token = cookie.parse(req.headers.cookie)

    res.status(200).json(token)
    return token
  } catch (error) {
    res.status(405).end()
  }
}

export default getCookiesHandler
