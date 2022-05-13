import { useRouter } from 'next/router'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000'
type userObj = {
  firstname: string
  lastname: string
  email: string
}
export type AuthContextInterface = {
  user: undefined | userObj
  signup: ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: signupProps) => void
  editUser: ({ firstname, lastname, email }: editUserProps) => void
  login: ({ email, password }: loginProps) => void
  logout: () => void
  isLoading: boolean
  authAlertActive: boolean
  authAlert: 'success' | 'error' | 'warning' | 'info'
  setIsLoading: Dispatch<SetStateAction<boolean>>
  refreshTokens: () => void
  getUserData: () => void
}

export const authContextDefaultValues: AuthContextInterface = {
  user: undefined,
  authAlert: 'info',
  authAlertActive: false,
  signup: () => Promise.resolve(),
  editUser: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
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
}
type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<userObj | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(true)
  const [authAlert, setAuthAlert] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  const [authAlertActive, setauthAlertActive] = useState(false)

  useEffect(() => {
    refreshTokens()
  }, [])
  const router = useRouter()

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
      /*       setUser({ access_token: data.access_token, refresh_token: data.refresh_token }) */
      setauthAlertActive(true)
      setAuthAlert('success')
    } else {
      setauthAlertActive(true)
      setAuthAlert('error')
    }
  }
  const editUser = async ({ firstname, lastname, email }: editUserProps) => {
    const res = await fetch(`${API_URL}/api/editUser`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
      }),
    })

    const data = await res.json()

    if (res.ok && data) {
      const userData = await getUserData()
      setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email })
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
      setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email })
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
      setUser({ firstname: userData.firstname, lastname: userData.lastname, email: userData.email })
      setIsLoading(false)
    } else {
      //TODO What here
      setIsLoading(false)
      setUser(undefined)
    }
  }

  const getUserData = async () => {
    const res = await fetch(`${API_URL}/api/getUser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.ok && data) {
      setUser({ firstname: data.firstname, lastname: data.lastname, email: data.email })

      return data
    } else {
      //TODO What here
    }
  }

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

  const value = {
    user,
    login,
    logout,
    signup,
    setIsLoading,
    isLoading,
    refreshTokens,
    authAlert,
    authAlertActive,
    getUserData,
    editUser,
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
