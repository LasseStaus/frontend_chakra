import { NextApiRequest, NextApiResponse } from 'next';
import GetHeaderTokens from './apihelpers/getHeaderTokens';
import setCookies from './apihelpers/setCookies';
//TODO Put into .env file, goes for all API urls including createAsync
const API_URL = 'http://localhost:3333'

export default async function refreshTokens(req: NextApiRequest, res: NextApiResponse) {
    try {

        const tokens = GetHeaderTokens(req, res)
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokens?.RT} `
            }
        })
        const data = await response.json()

       setCookies(res, data.tokens)
        console.log("HELLO 1");
        return res.status(200).json(data)

    } catch (error) {
        console.log("HELLO 2");
        res.status(403)

    }

}