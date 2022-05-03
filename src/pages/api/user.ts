import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function getUser(req:NextApiRequest, res:NextApiResponse) {
    
    if (req.method === 'POST') {

        if (!req.headers.cookie) {
            res.status(403).json({ message: 'Not Authorized' })
            return
        }

        const  token  = cookie.parse(req.headers.cookie)

      const rt = token.RT
        console.log("RT ", token);
        
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${rt} `
            }
        })

        const data = await response.json()



       console.log("den her er fra refresh", data)
        if (response.ok) {
            res.setHeader("Set-Cookie", 
            [
    
            cookie.serialize("AT", String(data.access_token), {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: 'strict',
              path: '/'
            }),
            cookie.serialize("RT", String(data.refresh_token), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/'
              }),
        
            ],)
            res.status(200).json(data)      
        
        } else {
            console.log('User forbidden');

            res.status(403).json({ message: 'User forbidden' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed `})
    }
}