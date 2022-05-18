import { useContext } from "react";
import User from "../models/User";
import { AuthContext } from "./AuthContext";
import { ActionTypes } from "./AuthReducer";
import { LoginProps, SignupProps } from "./AuthTypes"

const API_URL = 'http://localhost:3000'

// signup
// ================================================
export const signup = async ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: SignupProps) => {
    const res = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            firstname,
            lastname,
            phonenumber,
            passwordConfirm,
        }),
    })

    const data = await res.json()

    if (res.ok && data) {
        console.log('successfull signup');

        //   setAuthAlert('success')
        //   setAlertText('Congratulations, you signed up successfully')
    } else {
        console.log('unsuccessfull signup');
        //   setAuthAlert('error')
        //   setAlertText(data?.message)
    }
    // setAlertActive(true)
}

// Login
// ================================================
export const login = async ({ email, password }: LoginProps) => {

    const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const data = await res.json()

    if (res.ok && data) {
        console.log("vi er i login action OK");

        const userData = await getUserData()
        const user = new User(userData.id, userData.firstname, userData.lastname, userData.email, userData.phonenumber)
        return user
        //   const userData = await getUserData()
        //   setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email, phonenumber: userData.phonenumber })
    } else {
    }
}

// getUserData
// ================================================
const getUserData = async () => {
    const res = await fetch(`${API_URL}/api/getUser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()

    if (res.ok && data) {
        // setUser({ firstname: data.firstname, lastname: data.lastname, email: data.email, phonenumber: data.phonenumber })
        return data
    } else {
        // setAuthAlert('error')
        // setAlertText(data?.message)
        // setAlertActive(true)
    }
}

// logout
// ================================================
export const logout = async () => {
    const res = await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()
    return res

    // if (res.ok) {
    //     // setUser(undefined)

    // } else {
    //     // setAuthAlert('error')
    //     // setAlertText(data?.message)
    //     // setAlertActive(true)

    //     //todo this is backup incase something messes up
    //     // setUser(undefined)
    // }
}

// Refresh tokens
// ================================================
export const refreshTokens = async () => {
    const res = await fetch(`${API_URL}/api/refreshTokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()

    if (res.ok && data) {
        const userData = await getUserData()
        const user = new User(userData.id, userData.firstname, userData.lastname, userData.email, userData.phonenumber)
        return user

        // const userData = await getUserData()
        // setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email, phonenumber: userData.phonenumber })
        // setIsLoading(false)
    } else {
        console.log("problem with refresh");

        // setIsLoading(false)
        // setUser(undefined)
    }
}


