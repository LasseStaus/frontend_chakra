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
  tokens:any
 
  authenticated: boolean
  authenticationLoad: boolean
  loginMessageForUser: string | undefined | SerializedError | unknown
  signupMessageForUser: string | undefined | SerializedError | unknown
  messageForUserState: "error" | "success" | undefined
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
  signupMessageForUser: undefined,
  loginMessageForUser: undefined,
  messageForUserState: undefined,
  authenticationLoad: true
}

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    // updateUser: (state, action: PayloadAction<User>) => {
    //   state.user = action.payload
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.pending = false
      state.signupMessageForUser = "Your user has been created! Please go to login"
      state.tokens = action.payload.access_tokens
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
        state.tokens = action.payload.access_token
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
        state.loginMessageForUser = "It's been a while! Please login again "
        state.authenticationLoad = false
      })
  }
})

// export const { updateUser } = authenticationSlice.actions

export const selectAuthentication = (state: any) => state.authentication
