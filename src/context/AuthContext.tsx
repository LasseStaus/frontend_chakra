import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { EditUserPasswordProps, EditUserProps, LoginProps, SignupProps, UserObjProps } from './AuthTypes'

const API_URL = 'http://localhost:3000'

type Props = {
  children: ReactNode
}

export type AuthContextInterface = {
  user: undefined | UserObjProps
  signup: ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: SignupProps) => void
  editUser: ({ firstname, lastname, email }: EditUserProps) => void
  editUserPassword: ({ passwordCurrent, passwordNew, passwordNewConfirm }: EditUserPasswordProps) => void
  login: ({ email, password }: LoginProps) => void
  logout: () => void
  isLoading: boolean
  alertActive: boolean
  authAlert: 'success' | 'error' | 'warning' | 'info'
  alertText: string
  setAlertActive: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  refreshTokens: () => void
  getUserData: () => void
  purchaseTicket: (amountOfTickets: number | null) => void
}

export const authContextDefaultValues: AuthContextInterface = {
  user: undefined,
  authAlert: 'info',
  alertActive: false,
  alertText: '',
  signup: () => Promise.resolve(),
  editUser: () => Promise.resolve(),
  editUserPassword: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setAlertActive: () => Promise.resolve(),
  setIsLoading: () => Promise.resolve(),
  refreshTokens: () => Promise.resolve(),
  getUserData: () => Promise.resolve(),
  purchaseTicket: () => Promise.resolve(),
  isLoading: true,
}

const AuthContext = createContext<AuthContextInterface>(authContextDefaultValues)


export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserObjProps | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [authAlert, setAuthAlert] = useState<'success' | 'error' | 'warning' | 'info'>('info')
  const [alertText, setAlertText] = useState<string>('')
  const [alertActive, setAlertActive] = useState(false)

  useEffect(() => {
    refreshTokens()
  }, [])


  // signup
  // ================================================
  const signup = async ({ firstname, lastname, email, password, phonenumber, passwordConfirm }: SignupProps) => {
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

    if (res.ok && data) {
      setAuthAlert('success')
      setAlertText('Congratulations, you signed up successfully')
    } else {
      setAuthAlert('error')
      setAlertText(data?.message)
    }
    setAlertActive(true)
  }


  // login
  // ================================================
  const login = async ({ email, password }: LoginProps) => {
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
      setAuthAlert('error')
      setAlertText(data?.message)
      setAlertActive(true)
    }
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
      setIsLoading(false)
      setUser(undefined)
    }
  }

  // logout
  // ================================================
  const logout = async () => {
    const res = await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (res.ok) {
      setUser(undefined)

    } else {
      setAuthAlert('error')
      setAlertText(data?.message)
      setAlertActive(true)

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
      setAlertText(data?.message)
      setAlertActive(true)
    }
  }

  // editUserData
  // ================================================
  const editUser = async ({ firstname, lastname, email, phonenumber }: EditUserProps) => {
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

      setAuthAlert('info')
      setAlertText('User information updated successfully')
    } else {
      setAuthAlert('error')
      setAlertText(data?.message)
    }
    setAlertActive(true)
  }


  // editUserPassword
  // ================================================
  const editUserPassword = async ({ passwordCurrent, passwordNew, passwordNewConfirm }: EditUserPasswordProps) => {
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
      setAuthAlert('info')
      setAlertText('Password updated successfully')
    } else {
      setAuthAlert('error')
      setAlertText(data?.message)
    }
    setAlertActive(true)
  }

  // ==============================
  // ============TICKET============
  // ==============================

  const purchaseTicket = async (amountOfTickets: number | null) => {
    console.log("Auth", amountOfTickets);

    const res = await fetch(`${API_URL}/api/purchaseTicket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        amountOfTickets
      ),
    })

    const data = await res.json()

    if (res.ok && data) {
      console.log("Ticket purchased successfully");
    } else {
      console.log("ERROR Ticket purchase");
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
    alertText,
    alertActive,
    setAlertActive,
    getUserData,
    editUser,
    editUserPassword,
    purchaseTicket
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
