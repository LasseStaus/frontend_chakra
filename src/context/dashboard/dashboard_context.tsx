import React, { FunctionComponent, useContext, useReducer, useState } from "react";
import { createContext, ReactNode } from "react";
import { DashbaordReducer } from "./dashboard_reducer";
import { initialState } from "./dashboard_reducer";
import { ActionType } from "./dashboard_state";

interface UserContextInterface {
    firstname: string
    lastname: string
    email: string
    phonenumber: number | null
    // setUserData: (userData: any) => void
}



export const userContextInterfaceDefaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: null
    // setUserData: () => Promise.resolve(),
}

const DashboardContext = createContext<UserContextInterface>(userContextInterfaceDefaultValues)

type Props = {
    children: ReactNode
}

export const DashboardProvider = ({ children }: Props) => {

}

export default DashboardContext