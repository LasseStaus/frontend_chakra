import { NextApiRequest, NextApiResponse } from 'next';
import clearCookies from '../../components/apihelpers/clearCookies';
import GetHeaderTokens from '../../components/apihelpers/getHeaderTokens';
import setCookies from '../../components/apihelpers/setCookies';
//TODO Put into .env file, goes for all API urls including createAsync
const API_URL = 'http://localhost:3333'

export default async function getNewRefreshToken(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const tokens = await GetHeaderTokens(req, res)
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokens?.RT} `
            }
        })
        const data = await response.json()

        if (response.ok && data.tokens) {
            setCookies(res, data.tokens)
            return res.status(200).json(data)
        } else {

            return res.status(403).json({ message: 'Not Authorized' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
       return res.status(405).json({ message: `Method ${req.method} not allowed ` })
    }
}