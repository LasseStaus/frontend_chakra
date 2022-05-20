import { createAsyncThunk, createSlice, PayloadAction, SerializedError, ThunkAction } from "@reduxjs/toolkit"
import getPurchases from "../pages/api/getPurchases"
import { authenticationSliceState } from "./authenticationSlice"
import { createBooking, editUserInfo, editUserPassword, getUserInfo } from "./userActions"

interface User {
  firstname: string | undefined
  lastname: string | undefined
  email: string | undefined
  phonenumber: string | number | undefined
}

export interface Tickets {
  activeTickets: string | number | undefined
  usedTickets: string | number | undefined
}

export interface Booking {
  id: string
  bookedFor: Date
  createdAt: Date
  userId: string
  iLOQKey?: string
}
interface Purchase {
  id: string
  purchasedAt: string
  amountOfTickets: string
  paymentMethod: string
  userId: string
}

export interface userSliceState {
  user: User | undefined
  tickets: Tickets
  bookings: Booking[]
  purchases: Purchase[]
  pending: boolean
  alertMessage: string | undefined | SerializedError | unknown
  alertType: "success" | "error" | "warning" | "info" | undefined
}

const initialState: userSliceState = {
  user: {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phonenumber: undefined
  },
  bookings: [],
  purchases: [],
  tickets: {
    activeTickets: undefined,
    usedTickets: undefined
  },
  pending: true,
  alertMessage: undefined,
  alertType: undefined
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload
    },
    updateSelectedBookings: (state, action) => {state.bookings = action.payload}
  },
  extraReducers: (builder) => {
    //
    //getUserInfo
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        phonenumber: action.payload.phonenumber
      }
      state.bookings = action.payload.bookings
      state.purchases = action.payload.purchase
      state.tickets = {
        activeTickets: action.payload.ticket.activeTickets,
        usedTickets: action.payload.ticket.usedTickets
      }
    }),
      builder.addCase(getUserInfo.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(getUserInfo.rejected, (state, action) => {
        state.pending = false
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      //
      //editUserInfo
      builder.addCase(editUserInfo.fulfilled, (state, action) => {
        state.user = {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          phonenumber: action.payload.phonenumber
        }

        state.alertMessage = "User information updated successfully"
        state.alertType = "success"
      }),
      builder.addCase(editUserInfo.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(editUserInfo.rejected, (state, action) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = "error"
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      //
      //editUserPassword
      builder.addCase(editUserPassword.fulfilled, (state, action) => {
        console.log("password success")
        state.alertMessage = action.payload
        state.alertType = 'success'
      }),
      builder.addCase(editUserPassword.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(editUserPassword.rejected, (state, action) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = "error"
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(createBooking.fulfilled, (state, action) => {
        state.pending = false
      }),
      builder.addCase(createBooking.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(createBooking.rejected, (state, action) => {
        state.pending = false
  
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      })
  }
})
// export const {} = userSlice.actions

export const { setAlertMessage, updateSelectedBookings } = userSlice.actions

// export const selectUser = (state: any) => state.user.user
