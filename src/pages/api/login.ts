import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'
import setCookies from "../../components/apihelpers/setCookies";

// const API_URL = process.env.BACKEND_URL
const API_URL = 'http://localhost:3333';

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

    if (response.ok) {
      setCookies(res, data)
      return res.status(200).json(data)
    } else {
      res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
