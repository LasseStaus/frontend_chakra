import router from 'next/router'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000'

export type AuthContextInterface = {
  user: { access_token: string | undefined; refresh_token: string | undefined }
  login: ({ email, password }: loginProps) => void
  logout: () => void
  emailError: string | null
  passwordError: string | null
  isLoading: boolean
}

type userObj = {
  access_token: string | undefined
  refresh_token: string | undefined
}
export const authContextDefaultValues: AuthContextInterface = {
  user: { access_token: undefined, refresh_token: undefined },
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
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

type AuthProvider = {
  login: (params: any) => Promise<any>
  logout: (params: any) => Promise<void | false | string>
  checkAuth: (params: any) => Promise<void>
  checkError: (error: any) => Promise<void>
  getIdentity?: () => Promise<any>
  getPermissions: (params: any) => Promise<any>
  [key: string]: any
}
export function AuthProvider({ children }: Props) {
  useEffect(() => {
    getUser()
  }, [])

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
    console.log('hallo', data)

    if (res.ok) {
      console.log('LOGIN USER', user)

      setUser({ access_token: data.access_token, refresh_token: data.refresh_token })
      console.log('LOGIN USER after set', user)

      //  router.push('/user')
    } else {
      setEmailError(data.message)
      console.log(data)
    }
    // Making a post request to hit our backend api-endpoint
  }

  //getUser

  // Check if user is logged in
  // ================================================
  const getUser = async () => {
    setIsLoading(true)

    console.log('Get User')

    const res = await fetch(`${API_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    if (res.ok && data) {
      console.log('getUser', user)

      console.log('GetUser AT', data.access_token)
      console.log('GetUser RT', data.refresh_token)

      setUser({ access_token: data.access_token, refresh_token: data.refresh_token })

      console.log('getuser After set', user)

      //   router.push('/')
    } else {
      console.log('User is NOT logged in')
      //    setUser({ access_token: '', refresh_token: '' })
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
      console.log('UD MED DIG')

      setUser({ access_token: undefined, refresh_token: undefined })
    } else {
      console.error('error logging out user')
    }
  }

  const value = {
    user,
    login,
    logout,
    emailError,
    passwordError,
    isLoading,
    getUser,
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
