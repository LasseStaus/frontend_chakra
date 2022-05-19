import { createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit"
import getPurchases from "../pages/api/getPurchases"
import { authenticationSliceState } from "./authenticationSlice"

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

interface Booking {
  id: string
  bookedFor: string
  createdAt: string
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

interface userSliceState {
  user: User
  tickets: Tickets
  bookings: Booking[]
  purchases: Purchase[]
  pending: boolean
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
  pending: true
}

const API_URL = "http://localhost:3333"

export const getUserInfo = createAsyncThunk("loggedInUser/getUserInfo", async (_, { getState }) => {
  const token = getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token.authentication.tokens}`
    }
  })
  const resData = await response.json()

  console.log(resData, "use info")

  if (response.status === 200) {
    console.log("status OK", resData)

    return resData
  } else {
    return
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    /*   updateBookings: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateTickets: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    } */
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.user = {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        phonenumber: action.payload.phonenumber
      }
      state.bookings.push(action.payload.bookings)
      state.purchases.push(action.payload.purchase)
      state.tickets = {
        activeTickets: action.payload.ticket.activeTickets,
        usedTickets: action.payload.ticket.usedTickets
      }
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
