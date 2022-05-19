import { NextApiRequest, NextApiResponse } from "next"
import cookie from 'cookie'
import { useDispatch } from "react-redux";

// const API_URL = process.env.BACKEND_URL
const API_URL = 'http://localhost:3333';
import { selectUser, logoutUser, signupToApi } from "../../redux/authenticationSlice"

export default async function SignupOldApi(req: NextApiRequest, res: NextApiResponse) {
const dispatch = useDispatch()
  if (req.method === 'POST') {

    const response = await fetch(`${API_URL}/auth/local/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })

    const data = await response.json()

    if (response.ok) {
      res.status(200).json(data)
      console.log("api data", data);
      
      dispatch(signupUser(data))
    } else {
      res.status(data.statusCode).json({ message: data.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
