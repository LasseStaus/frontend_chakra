import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function updateBooking(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'PATCH') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const token = cookie.parse(req.headers.cookie)

    console.log("NU NU", req.body);

    const { bookingId, formData } = req.body
    console.log("NU NU", formData, bookingId);

    const response = await fetch(`${API_URL}/booking/updateBooking`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.AT} `,
      },
      body: JSON.stringify({
        id: bookingId,
        iLOQKey: formData.key
      })

    })

    const data = await response.json()

    if (response.ok) {
      return res.status(200).json(data)
    } else {
      res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
