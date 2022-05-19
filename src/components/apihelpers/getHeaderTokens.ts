import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'

export default function getHeaderTokens(req:NextApiRequest, res:NextApiResponse){
    if (!req.headers.cookie) {
        return   res.status(403).json({ message: 'Not Authorized' })
    }

    
    const token = cookie.parse(req.headers.cookie)
    console.log("Tokens are ok", token);
    return token

}