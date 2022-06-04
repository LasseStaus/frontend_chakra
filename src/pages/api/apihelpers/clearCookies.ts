import { NextApiResponse } from "next";
import cookie from 'cookie'


export default function clearCookies(res:NextApiResponse) {
  console.log("helo clearcookie");
  return (
    res.setHeader("Set-Cookie",
        [
          cookie.serialize("AT", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: -1, // 1 week
            sameSite: 'strict',
            path: '/'
          }),
          cookie.serialize("RT", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: -1, // 1 week
            sameSite: 'strict',
            path: '/'
          }),
        ],
      )

  )
    
}