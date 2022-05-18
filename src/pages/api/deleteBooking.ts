import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'

// const API_URL = process.env.BACKEND_URL
const API_URL = 'http://localhost:3333'

export default async function deleteBooking(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    if (!req.headers.cookie) {
        res.status(403).json({ message: 'Not Authorized' })
        return
      }



      const token = cookie.parse(req.headers.cookie)

    const response = await fetch(`${API_URL}/booking/deleteBooking`, {
      method: 'POST',
      headers: {     
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.AT}`,
      },
      body: JSON.stringify(
    req.body
    )
    
    })

    const data = await response.json()

    if (response.ok) {
        console.log('BOOKING DELETED API', data)

      res.status(200).json(data)
    } else {
      res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
