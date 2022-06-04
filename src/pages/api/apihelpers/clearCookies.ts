import { NextApiResponse } from "next";
import cookie from 'cookie'


export default function clearCookies(res:NextApiResponse) {
  console.log("helo clearcookie");

    res.setHeader("Set-Cookie",
        [
          cookie.serialize("AT", '', {
            httpOnly: true,
            secure: false,
            maxAge: -1, // 1 week
            sameSite: 'strict',
            path: '/'
          }),
          cookie.serialize("RT", '', {
            httpOnly: true,
            secure: false,
            maxAge: -1, // 1 week
            sameSite: 'strict',
            path: '/'
          }),
        ],
      )
  
}