import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useReducer, useState } from 'react'
import { TicketsProps } from '../components/tickets/TicketContainer'
import { authReducer } from './AuthReducer'
import { EditUserPasswordProps, EditUserProps, LoginProps, SignupProps, UserObjProps } from './AuthTypes'

const API_URL = 'http://localhost:3000'

type Props = {
  children: ReactNode
}

export type InitialStateType = {
  loggedInUser: UserObjProps[] | undefined;
}

const initialState = {
  loggedInUser: undefined,
}


const AuthContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

// const mainReducer = ({ loggedInUser }, action) => ({
//   loggedInUser: authReducer(loggedInUser, action),
//   // shoppingCart: shoppingCartReducer(shoppingCart, action),
// });



const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };