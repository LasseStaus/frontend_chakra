import { NextApiResponse } from 'next'
import cookie from 'cookie'

type Tokens = {
  access_token: string
  refresh_token: string
}
export default function setCookies(res: NextApiResponse, data: Tokens) {
  res.setHeader('Set-Cookie', [
    cookie.serialize('AT', String(data.access_token), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/'
    }),
    cookie.serialize('RT', String(data.refresh_token), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/'
    })
  ])
}
