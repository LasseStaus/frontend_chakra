import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333'
export default async function logout(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    //TODO Hvad mener du her johanne
    // TO DO MÅSKE LAVES OM
    // DESTROY COOKIE

    console.log("INSIDE LOGOUT API");
    

    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const token = cookie.parse(req.headers.cookie)

    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.AT}`
      }
    })

    if (response.ok) {

      res.setHeader("Set-Cookie",
        [
          cookie.serialize("AT", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: -1, // 1 week
            sameSite: 'strict',
            path: '/'
          }),
          cookie.serialize("RT", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: -1, // 1 week
            sameSite: 'strict',
            path: '/'
          }),
        ],
      )


      res.status(200).json({ message: "Logout Success" })
    }
    else {
      res.status(403).json({ message: 'Something went wrong' })
    }

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}