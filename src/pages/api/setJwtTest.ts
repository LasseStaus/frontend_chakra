import { NextApiResponse } from "next";
import cookie from 'cookie'
export function setJwtFromApi(data:any, res: NextApiResponse) {


    console.log(data);
    
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

}