import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  firstname: string | undefined
  lastname: string | undefined
  email: string | undefined
  phonenumber: string | number | undefined

}

interface Tickets{
  activeTickets: string | number | undefined
  usedTickets: string | number | undefined
}
interface Bookings {
  currentBookings: string | string[] | undefined
}

interface userSliceState {
  user: User | undefined
  tickets: Tickets | undefined
  bookings: Bookings | undefined
  pending: boolean

}

const initialState: userSliceState = {
  user: {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phonenumber: undefined
  },
  bookings: undefined,
  tickets: undefined,
  pending: true
  

}

const API_URL = "http://localhost:3333"
export const getUserInfo = createAsyncThunk("authentication/login", async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/sakdlaskd`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const resData = await response.json()

  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})


export const userSlice = createSlice({
  name: "loggedInUser",
  initialState: initialState,
  reducers: {
/*     updateBookings: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateTickets: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
 
    }),
      builder.addCase(getUserInfo.pending, (state, action) => {
  
      }),
      builder.addCase(getUserInfo.rejected, (state, action) => {

      })
     }

})

export const {  } = userSlice.actions

export const selectUser = (state: any) => state.user.user
