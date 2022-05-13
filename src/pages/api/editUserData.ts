import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333'
export default async function editUserData(req: NextApiRequest, res: NextApiResponse) {



  if (!req.headers.cookie) {
    res.status(403).json({ message: 'Not Authorized' })
    return
  }
  console.log("info in editusedata AOPI", req.body);

  const token = cookie.parse(req.headers.cookie)
  console.log("KOM NUUUU", JSON.stringify(req.body));

  const at = token.AT
  const { email, firstname, lastname } = req.body



  const response = await fetch(`${API_URL}/user/edit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.AT}`
    },
    body: JSON.stringify(
      req.body
    )
  })

  const test = await response.json()
  console.log("response in edituser", test);


  if (response.ok) {
    console.log(test, "respose API edit");

    res.status(200).json(test)
  }
  else {
    res.status(403).json({ message: 'User forbidden' })
  }


}