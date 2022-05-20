import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import clearCookies from '../../components/apihelpers/clearCookies'
import getHeaderTokens from '../../components/apihelpers/getHeaderTokens'

const API_URL = 'http://localhost:3333'
export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const token = getHeaderTokens(req, res)
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token?.AT}`
      }
    })

    if (response.ok) {
      clearCookies(res)
      return res.status(200).json({ message: "You have been logged out!" })
    }
    else {
      return res.status(403).json({ message: 'Something went wrong' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}