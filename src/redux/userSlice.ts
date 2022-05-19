import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import { NextApiResponse } from "next"
import { useSelector } from "react-redux"
import getHeaderTokens from "../components/apihelpers/getHeaderTokens"
import GetTokenForSlice from "../components/apihelpers/getTokenForSlices"
import Logo from "../components/header/Logo"
import { authenticationSliceState } from "./authenticationSlice"
import { RootState, store } from "./store"

interface User {
  firstname: any 
  lastname: string | undefined
  email: string | undefined
  phonenumber: string | number | undefined
}

interface Tickets {
  activeTickets: string | number | undefined
  usedTickets: string | number | undefined
}
interface Bookings {
  currentBookings: string | string[] | undefined
}

interface userSliceState {
  user: User 
  tickets: Tickets | undefined
  bookings: Bookings | undefined
  firstname: string |undefined
  pending: boolean,
   test: string
}

const initialState: userSliceState = {
  user: {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phonenumber: undefined,
  },
  firstname: undefined,

  test: '',
  bookings: undefined,
  tickets: undefined,
  pending: true
}

const API_URL = "http://localhost:3333"

 
export const getUserInfo = createAsyncThunk("loggedInUser/getUserInfo", async (_, { getState,}  ) => {


const token = getState()  as {authentication: authenticationSliceState}


  const response = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
       authorization: `Bearer ${token.authentication.tokens}`
    }
  })
  const resData = await response.json()

  console.log(resData, "use info");
  
  if (response.status === 200) {
    console.log("status OK", resData);
    
    return resData
  } else {
    return
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
        updateBookings: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateTickets: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => { 
        state.user.firstname = action.payload.firstname
    }),
      builder.addCase(getUserInfo.pending, (state, action) => {}),

      builder.addCase(getUserInfo.rejected, (state, action) => {})
  }
})

function GetHeaderTokens(req: any, res: any) {
  throw new Error("Function not implemented.")
}
// export const {} = userSlice.actions

// export const selectUser = (state: any) => state.user.user
