import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function getUserData(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      console.log('no cookie in header', req.headers.cookie)

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
