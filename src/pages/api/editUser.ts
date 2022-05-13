import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function getUserData(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'PATCH') {
    if (!req.headers.cookie) {
        res.status(403).json({ message: 'Not Authorized' })
        return
      }
    const token = cookie.parse(req.headers.cookie)
        const rt = token.RT


    const response = await fetch(`${API_URL}/user/edit`, {
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
    console.log('getUserProfiledata', data)

     if (response.ok) {
       
      return res.status(200).json(data)


        } else {
     
         return   res.status(403).json({ message: 'User forbidden' })
          
        }
  } else {
          //TODO What here
  }
}
