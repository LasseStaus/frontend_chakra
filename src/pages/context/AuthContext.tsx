import router from 'next/router'
import React, { createContext, ReactNode, useContext, useState } from 'react'

const API_URL = 'http://localhost:3000'

export interface AuthContextInterface {
  user: { access_token: string | null; refresh_token: string | null } | null
  login: ({ email, password }: loginProps) => void
  logout: () => void
  emailError: string | null
  passwordError: string | null
  isLoading: boolean
}

type userObj = {
  access_token: string
  refresh_token: string
}
export const authContextDefaultValues: AuthContextInterface = {
  user: { access_token: '', refresh_token: '' },
  login: () => {},
  logout: () => {},
  emailError: null,
  passwordError: null,
  isLoading: false,
}
const AuthContext = createContext<AuthContextInterface>(authContextDefaultValues)

type loginProps = {
  email: string
  password: string
}
type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<userObj>({ access_token: '', refresh_token: '' })
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // LOGIN
  const login = async ({ email, password }: loginProps) => {
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

    if (res.ok) {
      setUser(data)

      router.push('/user')
    } else {
      setEmailError(data.message)
      console.log(data)
    }
    // Making a post request to hit our backend api-endpoint
  }

  const logout = () => {
    setUser({ access_token: '', refresh_token: '' })
  }

  const value = {
    user,
    login,
    logout,
    emailError,
    passwordError,
    isLoading,
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
