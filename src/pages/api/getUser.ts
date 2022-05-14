import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function getUserData(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const token = cookie.parse(req.headers.cookie)

    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.AT} `,
      },
    })

    const data = await response.json()

    if (response.ok) {
      return res.status(200).json(data)
    } else {
      res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
