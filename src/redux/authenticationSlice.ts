import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

const API_URL = 'http://localhost:3000'
export const loginThunk = createAsyncThunk(
  "users/login",
  async (data: any, thunkAPI) => {
    const response = await fetch(
      `${API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    const resData = await response.json()

    if (response.status === 200) {
      return resData
    } else {
      return thunkAPI.rejectWithValue(resData.message)
    }
  }
)

export const signupThunk = createAsyncThunk(
  "users/signup",
  async (data: any, thunkAPI) => {
    const response = await fetch(
      `${API_URL}/api/signup`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    const resData = await response.json()
    if (response.status === 200) {
      return resData
    } else {
      console.log(resData);

      return thunkAPI.rejectWithValue(resData.message)
    }

  }
)

export const logoutThunk = createAsyncThunk(
  "users/logout",
  async (data: any, thunkAPI) => {
    console.log("lougt createasync")
    const response = await fetch(
      `${API_URL}/api/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      }
    )
    const resData = await response.json()
    if (response.status === 200) {
      return resData
    } else {
      return thunkAPI.rejectWithValue(resData.message)
    }

  }
)
export const authenticateOnLoad = createAsyncThunk(
  "users/authenticateOnLoad",
  async (data, thunkAPI) => {
    const response = await fetch(
      `${API_URL}/api/authenticateOnLoad`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const resData = await response.json()
    if (response.status === 200) {
      return resData
    } else {
      return thunkAPI.rejectWithValue(resData)
    }

  }
)

interface User {
  firstname: any
  lastname: String
  email: string
}

interface authenticationSliceState {
  user: User | undefined
  pending: boolean,
  tokens: any,
  authenticated: boolean,
  authenticationLoad: boolean,
  loginMessageForUser: string | undefined | SerializedError | unknown
  signupMessageForUser: string | undefined | SerializedError | unknown
  messageForUserState: 'error' | 'success' | undefined
}

const initialState: authenticationSliceState = {
  user: {
    firstname: 'sad',
    lastname: '',
    email: '',
  },
  pending: true,
  tokens: null,
  authenticated: false,
  signupMessageForUser: undefined,
  loginMessageForUser: undefined,
  messageForUserState: undefined,
  authenticationLoad: true


}

export const authenticationSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },

  },
  extraReducers: (builder) => {
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.pending = false
      state.signupMessageForUser = 'Your user has been created! Please go to login'
      state.tokens = action.payload.access_token
    }),
      builder.addCase(signupThunk.pending, (state, action) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(signupThunk.rejected, (state, action) => {
        state.pending = false
        state.authenticated = false
        state.signupMessageForUser = action.payload
      }),
      builder.addCase(loginThunk.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = true
        state.user = undefined
        state.loginMessageForUser = "You've successfully logged in!"
        /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
        state.tokens = { AT: action.payload.access_token }
      }),
      builder.addCase(loginThunk.pending, (state, action) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(loginThunk.rejected, (state, action) => {
        state.pending = false
        state.user = undefined
        state.authenticated = false
        state.loginMessageForUser = action.payload

      }),
      builder.addCase(logoutThunk.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = false
        state.user = undefined
        /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
        state.tokens = undefined
        state.loginMessageForUser = action.payload.message
      }),
      builder.addCase(logoutThunk.pending, (state, action) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(logoutThunk.rejected, (state, action) => {
        state.pending = false
        state.user = undefined
        state.authenticated = false
      }),
      builder.addCase(authenticateOnLoad.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = true
        state.user = undefined
        /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
        state.tokens = undefined
        state.pending = false
        state.authenticationLoad = false

      }),
      builder.addCase(authenticateOnLoad.pending, (state, action) => {
        state.pending = true
        state.authenticated = false
        state.authenticationLoad = true
      }),
      builder.addCase(authenticateOnLoad.rejected, (state, action) => {
        state.pending = false
        state.user = undefined
        state.authenticated = false
        state.loginMessageForUser = "It's been a while! Please login again "
        state.authenticationLoad = false
      })
  }
})

export const { updateUser } = authenticationSlice.actions





export const selectUser = (state: any) => state.user.user