import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export type Tokens = {
  access_token: string
  refresh_token: string
}

// The cookie middleware will add the `set-cookie` header
const getCookiesHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: 'Not Authorized' })
    }

    const token = cookie.parse(req.headers.cookie)
    console.log(token, 'SE HER i getcookie api')

    res.status(200).json(token)
    return token
  } catch (error) {
    res.status(405).end()
  }
}

export default getCookiesHandler
