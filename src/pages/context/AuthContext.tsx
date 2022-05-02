import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import router, { useRouter } from 'next/router'
import React from 'react'

const API_URL = 'http://localhost:3000'

/* type AuthContext = {
     username: null | string
  signup: (newUsername: string, email: string, password: string, onSuccessCallback: any) => string | null 
  login: (email: string, password: string) => string | null
  /  logout: () => void 
} */

type authContextType = {
  user: boolean
  login: ({ email, password }: any) => void
  logout: () => void
  error: string | undefined
  isLoading: boolean
}
const authContextDefaultValues: authContextType = {
  user: false,
  login: () => {},
  logout: () => {},
  error: undefined,
  isLoading: true,
}
const AuthContext = createContext<authContextType>(authContextDefaultValues)

type loginProps = {
  email: string
  password: string
}
type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean>(false)

  const [error, setError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const login = async ({ email, password }: loginProps) => {
    console.log('LOGIN FUNCTION')

    console.log('LOGIN FUNCTION')
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
      setUser(data.user)
      router.push('/user')
    } else {
      setError(data.message)
    }
    // Making a post request to hit our backend api-endpoint
  }

  const logout = () => {
    setUser(false)
  }

  const value = {
    user,
    login,
    logout,
    error,
    isLoading,
  }
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}

//const AuthContext = createContext<AuthContext | null>(null)

export function useAuth() {
  return useContext(AuthContext)
}

/* export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // Register user
  /*   const register = async ({ fullname, email, password }: any) => {
    setIsLoading(true)
    console.log(fullname, email, password)
  } */

// Login user
/* const login = async ({ email, password }: any) => {
  setIsLoading(true)
  console.log(email, password)
}
 */
// Logout user
/* const logout = () => {
    console.log('User Logged out')
  }

  // Check if user id Logged in
  const checkedUserLoggedIn = async (user: any) => {
    console.log(user)

    console.log('Checked')
  } */
/*
  return <AuthContext.Provider value={{ login, isLoading, user, error }}>{children}</AuthContext.Provider>
} */
export default AuthContext
