import { NextApiRequest, NextApiResponse } from 'next'
import setCookies from './apihelpers/setCookies'

const API_URL = process.env.NEXT_PUBLIC_API_REST
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const response = await fetch(`${API_URL}/auth/local/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json()

    if (response.ok && data.tokens) {
      setCookies(res, data.tokens)
      return res.status(200).json(data)
    } else {
      return res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
