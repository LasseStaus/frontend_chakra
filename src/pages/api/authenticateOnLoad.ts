import { NextApiRequest, NextApiResponse } from 'next';
import GetHeaderTokens from '../../components/apihelpers/getHeaderTokens';
import setCookies from '../../components/apihelpers/setCookies';
const API_URL = 'http://localhost:3333' 

export default async function refreshTokens(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const tokens = GetHeaderTokens(req, res)

        console.log("the tokens", tokens);
        console.log("the tokens");
        console.log("the tokens");
    
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokens?.RT} `
            }
        })
        const data = await response.json()

        
        if (response.ok && data.tokens) {

            console.log("data in OK", data);
            
console.log("isadmin", data.isAdmin);
console.log("tokens", data.tokens);

            
         setCookies(res, data.tokens)
 
            
            return res.status(200).json(data)
        } else {

            return res.status(403).json({ message: 'Not Authorized' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed ` })
    }
}