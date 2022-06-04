import { NextApiRequest, NextApiResponse } from 'next'
import clearCookies from './apihelpers/clearCookies'
import getHeaderTokens from './apihelpers/getHeaderTokens'

const API_URL = process.env.NEXT_PUBLIC_API_REST

export default async function logout(req: NextApiRequest, res: NextApiResponse) {

  const token = getHeaderTokens(req, res)
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.AT}`
    }
  })
  const resData = await response.json()
  clearCookies(res)
  if (resData.ok) {
    clearCookies(res)

    return res.status(200).json({ message: "You have been logged out!" })
  }
  else {
    clearCookies(res)
    return res.status(403).json({ message: 'Something went wrong' })
  }
}