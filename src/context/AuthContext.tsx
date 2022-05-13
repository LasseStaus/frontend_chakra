import { useRouter } from 'next/router'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000'

type userObj = {
  firstname: string
  lastname: string
  email: string
  phonenumber: number
}

export type AuthContextInterface = {
  user: undefined | userObj
  signup: ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: signupProps) => void
  editUser: ({ firstname, lastname, email }: editUserProps) => void
  editUserPassword: ({ passwordCurrent, passwordNew, passwordNewConfirm }: editUserPasswordProps) => void
  login: ({ email, password }: loginProps) => void
  logout: () => void
  isLoading: boolean
  authAlertActive: boolean
  authAlert: 'success' | 'error' | 'warning' | 'info'
  authAlertText: string
  setauthAlertActive: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  refreshTokens: () => void
  getUserData: () => void
}

export const authContextDefaultValues: AuthContextInterface = {
  user: undefined,
  authAlert: 'info',
  authAlertActive: false,
  authAlertText: '',
  signup: () => Promise.resolve(),
  editUser: () => Promise.resolve(),
  editUserPassword: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setauthAlertActive: () => Promise.resolve(),
  setIsLoading: () => Promise.resolve(),
  refreshTokens: () => Promise.resolve(),
  getUserData: () => Promise.resolve(),

  isLoading: true,
}
const AuthContext = createContext<AuthContextInterface>(authContextDefaultValues)

type loginProps = {
  email: string
  password: string
}
type signupProps = {
  email: string
  password: string
  firstname: string
  lastname: string
  phonenumber: string
  passwordConfirm: string
}
type editUserProps = {
  email?: string
  firstname?: string
  lastname?: string
  phonenumber?: number
}

type editUserPasswordProps = {
  passwordCurrent: string
  passwordNew: string
  passwordNewConfirm: string
}
type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<userObj | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(true)
  const [authAlert, setAuthAlert] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  const [authAlertText, setAuthAlertText] = useState<string>('')
  const [authAlertActive, setauthAlertActive] = useState(false)

  useEffect(() => {
    refreshTokens()
  }, [])

  //Clear alerts after 3 seconds

  const signup = async ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: signupProps) => {
    const res = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        passwordConfirm: passwordConfirm,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setauthAlertActive(true)
      setAuthAlert('success')
    } else {
      setauthAlertActive(true)
      setAuthAlert('error')
    }
  }

  // LOGIN
  const login = async ({ email, password }: loginProps) => {
    console.log('in login')

    console.log(email, password)
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
      const userData = await getUserData()
      setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email, phonenumber: userData.phonenumber })
    } else {
      //TODO What here
    }
    // Making a post request to hit our backend api-endpoint
  }

  // Refresh tokens
  // ================================================
  const refreshTokens = async () => {
    const res = await fetch(`${API_URL}/api/refreshTokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.ok && data) {
      const userData = await getUserData()
      setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email, phonenumber: userData.phonenumber })
      setIsLoading(false)
    } else {
      //TODO What here
      setIsLoading(false)
      setUser(undefined)
    }
  }

  // Refresh tokens
  // ================================================
  const logout = async () => {
    const res = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      setUser(undefined)
    } else {
      //todo this is backup incase something messes up
      setUser(undefined)
    }
  }



  // ==============================
  // ==========USER DATA===========
  // ==============================


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
      setUser({ firstname: data.firstname, lastname: data.lastname, email: data.email, phonenumber: data.phonenumber })

      return data
    } else {
      setAuthAlert('error')
      setAuthAlertText(data?.message)
      setauthAlertActive(true)
    }
  }

  // editUser
  // ================================================
  const editUser = async ({ firstname, lastname, email, phonenumber }: editUserProps) => {
    const res = await fetch(`${API_URL}/api/editUser`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
      }),
    })

    const data = await res.json()

    if (res.ok && data) {
      const userData = await getUserData()

      setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email, phonenumber: userData.phonenumber })

      setAuthAlert('success')
      setAuthAlertText('User information updated successfully')
    } else {
      setAuthAlert('error')
      setAuthAlertText(data?.message)
    }
    setauthAlertActive(true)
  }


  // editUserPassword
  // ================================================
  const editUserPassword = async ({ passwordCurrent, passwordNew, passwordNewConfirm }: editUserPasswordProps) => {
    const res = await fetch(`${API_URL}/api/editUserPassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordCurrent: passwordCurrent,
        passwordNew: passwordNew,
        passwordNewConfirm: passwordNewConfirm,
      }),
    })

    const data = await res.json()

    if (res.ok && data) {
      setAuthAlert('success')
      setAuthAlertText('Password updated successfully')
    } else {
      setAuthAlert('error')
      setAuthAlertText(data?.message)
    }
    setauthAlertActive(true)
  }

  const value = {
    user,
    login,
    logout,
    signup,
    setIsLoading,
    isLoading,
    refreshTokens,
    authAlert,
    authAlertText,
    authAlertActive,
    setauthAlertActive,
    getUserData,
    editUser,
    editUserPassword,
  }
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
