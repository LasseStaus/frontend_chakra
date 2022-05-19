import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'
export default async function setJwtFromApi(reg:NextApiRequest, res: NextApiResponse) {

console.log("HALLO");
console.log("HALLO");

console.log("JWT API",reg.body);
console.log("HALLO");
console.log("HALLO");
console.log("HALLO");
    

const response = await fetch(`http://localhost:3333/auth/local/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(reg.body)
})

const data = await response.json()

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

    ],

  )

  res.status(200).json(data)
} else {
  res.status(data.statusCode).json({ message: data.message })
}

}