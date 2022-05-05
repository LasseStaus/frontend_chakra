import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'

const API_URL = process.env.BACKEND_URL

export default async function signup(req:NextApiRequest, res:NextApiResponse) {
  

  console.log("in login api");
  
  if(req.method === 'POST') {
    console.log("in signup api post");
    const { firstname, lastname, email, password, phonenumber, confirmPassword } = req.body


    console.log("SE HER", req.body);
    
    const apiRes = await fetch(`${API_URL}/auth/local/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })

    const data = await apiRes.json()

    console.log("SIGNUP TS RESPONSE", data)
    if(apiRes.ok) {

      console.log("siggnup API OK", data);
      
      res.status(200).json(data)
    } else {
      console.log("siggnup API NOT OK", data);
      res.status(data.statusCode).json({message: data.message})
    }
    
  } else {

    //TODO What does this do??
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: `Method ${req.method} not allowed`})
  }
}
