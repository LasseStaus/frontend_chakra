import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function editUserPassword(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'PATCH') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }
    const token = cookie.parse(req.headers.cookie)

    const response = await fetch(`${API_URL}/user/edit/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.AT} `,
      },
      body: JSON.stringify(
        req.body
      )

    })

    const data = await response.json()

    if (response.ok) {
      return res.status(200).json(data)

    } else {
      res.status(data.statusCode).json({ message: data.message })

    }
  } else {
    //TODO What here
  }
}
