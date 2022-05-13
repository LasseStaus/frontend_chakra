import React, { FunctionComponent, useContext, useReducer, useState } from "react";
import { createContext, ReactNode } from "react";
import { DashbaordReducer } from "./dashboard_reducer";
import { initialState } from "./dashboard_reducer";
import { ActionType } from "./dashboard_state";

interface UserContextInterface {
    loggedInUser?: {
        firstname: string
        lastname: string
        email: string
        phonenumber: number | null
    },
    setUserData: (userData: any) => void
}



export const userContextInterfaceDefaultValues = {
    loggedInUser: {
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: null
    },
    setUserData: () => Promise.resolve(),
}

const DashboardContext = createContext<UserContextInterface>(userContextInterfaceDefaultValues)

type Props = {
    children: ReactNode
}

export const DashboardProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(DashbaordReducer, initialState);
    console.log("VI ER INDE I PROVIDER");

    // const [loggedInUser, setLoggedInUser] = useState()


    // const value = {
    //     loggedInUser, setLoggedInUser
    // }
    const value = {
        loggedInUser: state.loggedInUser,
        setUserData: (userData: any) => {
            // setLoggedInUser(userData)
            console.log("VI ER INDE I PROVIDER 2", userData);
            dispatch({ type: ActionType.GET_USER_DATA, payload: userData });
        }
    }


    return (
        <>
            <DashboardContext.Provider value={value}> {children} </DashboardContext.Provider>
        </>
    )
}

export function useLoggedInUser() {
    return useContext(DashboardContext);
}

export default DashboardContext