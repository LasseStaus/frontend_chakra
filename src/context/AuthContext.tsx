import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000'

export type AuthContextInterface = {
  user: { access_token: string | undefined; refresh_token: string | undefined }
  signup: ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: signupProps) => void
  login: ({ email, password }: loginProps) => void
  logout: () => void
  isLoading: boolean
  authAlertActive: boolean
  authAlert: 'success' | 'error' | 'warning' | 'info'
}

type userObj = {
  access_token: string | undefined
  refresh_token: string | undefined
}
export const authContextDefaultValues: AuthContextInterface = {
  user: { access_token: undefined, refresh_token: undefined },
  authAlert: 'info',
  authAlertActive: false,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),

  isLoading: false,
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
type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  useEffect(() => {
    getUser()
  }, [])

  console.log('in authprovider')

  const [user, setUser] = useState<userObj>({ access_token: '', refresh_token: '' })

  const [isLoading, setIsLoading] = useState(false)
  const [authAlert, setAuthAlert] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  const [authAlertActive, setauthAlertActive] = useState(false)

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
    console.log('SIGNUP AUTH DATA', data)

    if (res.ok) {
      console.log('SIGNUP AUTH OK', data)

      setUser({ access_token: data.access_token, refresh_token: data.refresh_token })
      setauthAlertActive(true)
      setAuthAlert('success')
      console.log('SIGNUP USER after set', user)

      //  router.push('/user')
    } else {
      console.log('SIGNUP AUTH NOT OK', data)
      setauthAlertActive(true)
      setAuthAlert('error')
      console.log(data)
    }
    // Making a post request to hit our backend api-endpoint
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
    console.log('hallo', data)

    if (res.ok) {
      console.log('LOGIN USER', user)

      setUser({ access_token: data.access_token, refresh_token: data.refresh_token })
      console.log('LOGIN USER after set', user)

      //  router.push('/user')
    } else {
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
    signup,

    isLoading,
    getUser,
    authAlert,
    authAlertActive,
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
