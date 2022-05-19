import { NextApiRequest, NextApiResponse } from "next";
// const API_URL = process.env.BACKEND_URL
const API_URL = 'http://localhost:3333';

export default async function SignupOldApi(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = await fetch(`${API_URL}/auth/local/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const data = await response.json()
    if (response.ok) {
      return res.status(200).json(data)
      
    } else {
      return res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
