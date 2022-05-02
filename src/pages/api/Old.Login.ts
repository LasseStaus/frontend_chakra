import { NextApiRequest, NextApiResponse } from 'next'
import React from 'react'


interface loginParams {
    email: string, 
    password: string
}
 async function login(body : loginParams) {
    const API_URL = 'http://localhost:3333'

    const response = await fetch(`${API_URL}/auth/local/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
  
      const data = await response.json()

      console.log(data);
      
  
    console.log("inside login api")
    console.log(body)
    
  return "login"
}

export default login