import { useContext } from "react"
import User from "../models/User"
import { AuthContext } from "./AuthContext"
import { ActionTypes } from "./AuthReducer"
import { LoginProps, SignupProps } from "./AuthTypes"

const API_URL = "http://localhost:3000"

// signup
// ================================================
export const signup = async ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: SignupProps) => {
  const res = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      firstname,
      lastname,
      phonenumber,
      passwordConfirm
    })
  })

  const data = await res.json()

  if (res.ok && data) {
    console.log("successfull signup")
  } else {
    console.log("unsuccessfull signup")
  }
}

// Login
// ================================================
export const login = async ({ email, password }: LoginProps) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const data = await res.json()

  if (res.ok && data) {
    const userData = await getUserData()
    const user = new User(userData.id, userData.firstname, userData.lastname, userData.email, userData.phonenumber)
    return user
  } else {
    console.log("unsuccessfull signin")
  }
}

// getUserData
// ================================================
const getUserData = async () => {
  const res = await fetch(`${API_URL}/api/getUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = await res.json()

  if (res.ok && data) {
    return data
  } else {
  }
}

// logout
// ================================================
export const logout = async () => {
  const res = await fetch(`${API_URL}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })

  return res
}
