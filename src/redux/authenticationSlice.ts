import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit"
import { authenticateOnLoad, loginThunk, logoutThunk, signupThunk } from "./authenticationActions"

interface User {
  firstname: any
  lastname: String
  email: string
}

export interface authenticationSliceState {
  user: User | undefined
  pending: boolean
  tokens: any

  authenticated: boolean
  authenticationLoad: boolean
  alertMessage: string | undefined | SerializedError | unknown
  alertType: "success" | "error" | "warning" | "info" | undefined
}

const initialState: authenticationSliceState = {
  user: {
    firstname: "sad",
    lastname: "",
    email: ""
  },
  pending: true,
  tokens: undefined,
  authenticated: false,
  alertMessage: undefined,
  alertType: undefined,
  authenticationLoad: true
}

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    //
    //signupThunk
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.pending = false
      state.tokens = action.payload.access_tokens
      state.alertMessage = "Your user has been created! Please go to login"
      state.alertType = "success"
    }),
      builder.addCase(signupThunk.pending, (state, action) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(signupThunk.rejected, (state, action) => {
        state.pending = false
        state.authenticated = false
        state.alertMessage = action.payload
        state.alertType = "error"
      }),
      //
      //loginThunk
      builder.addCase(loginThunk.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = true
        state.user = undefined
        state.tokens = action.payload.access_token
        state.alertMessage = "You've successfully logged in!"
        state.alertType = "success"
      }),
      builder.addCase(loginThunk.pending, (state, action) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(loginThunk.rejected, (state, action) => {
        state.pending = false
        state.user = undefined
        state.authenticated = false
        state.alertMessage = action.payload
        state.alertType = "error"
      }),
      //
      //logoutThunk
      builder.addCase(logoutThunk.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = false
        state.user = undefined
        state.tokens = undefined
        state.alertMessage = action.payload.message
        state.alertType = "success"
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
      //
      //authenticateOnLoad
      builder.addCase(authenticateOnLoad.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = true
        state.user = undefined
        state.tokens = action.payload.access_token
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
        state.alertMessage = "It's been a while! Please login again "
        state.alertType = "info"
        state.authenticationLoad = false
      })
  }
})

export const { setAlertMessage } = authenticationSlice.actions

export const selectAuthentication = (state: any) => state.authentication
