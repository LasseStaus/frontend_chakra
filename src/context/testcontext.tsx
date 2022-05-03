import { createContext } from 'react'

export type Identifier = string | number
export interface UserIdentity {
  id: Identifier
  fullName?: string
  avatar?: string
  [key: string]: any
}

/**
 * authProvider types
 */
export type AuthProvider = {
  login: (params: any) => Promise<any>
  logout: (params: any) => Promise<void | false | string>
  checkAuth: (params: any) => Promise<void>
  checkError: (error: any) => Promise<void>
  getIdentity?: () => Promise<UserIdentity>
  getPermissions: (params: any) => Promise<any>
  [key: string]: any
}
const defaultIdentity: UserIdentity = { id: '' }

const defaultProvider: AuthProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () => Promise.resolve(defaultIdentity),
}

const AuthContext = createContext<AuthProvider>(defaultProvider)

AuthContext.displayName = 'AuthContext'

export default AuthContext
