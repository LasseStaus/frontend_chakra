import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333'
export default async function logout(req: NextApiRequest, res: NextApiResponse) {

  console.log("ER I START API");



  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Not Authorized' })
    return
  }

  const token = cookie.parse(req.headers.cookie)

  console.log("API", req.body)
  const at = token.AT
  console.log("RT ", at);

  const hej = Array.from(req.body)
  console.log("this is what im sending", JSON.stringify(req.body.selectedDates));
  

  try {
    const response = await fetch(`${API_URL}/booking/createBooking`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${at} `,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body.selectedDates)
      
    })
    
    const data = await response.json()
    console.log("det her", data);
    
    
    if (response.ok) {
      console.log("response ok", data);
      
      return res.status(200).json(data)
    } else {
      res.status(data.statusCode).json({ message: data.message })
    }
  }catch(err) {
    console.log("something went wrong ", err);
    
  }


}