import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'

const API_URL = process.env.BACKEND_URL

export default async function login(req:NextApiRequest, res:NextApiResponse) {
  
  console.log("BACKENDURL", API_URL);
  
  if(req.method === 'POST') {
    const { email, password } = req.body
    const apiRes = await fetch(`${API_URL}/auth/local/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await apiRes.json()

    console.log("logints", data)
    if(apiRes.ok) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', String(data.access_token), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/'
        })
     )

      res.status(200).json(data)
    } else {
      res.status(data.statusCode).json({message: data.message})
    }
    
  } else {

    //TODO What does this do??
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}
