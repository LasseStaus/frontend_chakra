import { AnyAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { authenticateOnLoad, loginThunk, logoutThunk, signupThunk, updateRefreshToken } from './authenticationActions'
import { RootState } from './store'

export interface authenticationSliceState {
  isAdmin: boolean
  pending: boolean
  authenticated: boolean
  authenticationLoad: boolean
  alertMessage: string | undefined
  alertType: 'success' | 'error' | 'warning' | 'info' | undefined
}

const initialState: authenticationSliceState = {
  isAdmin: false,
  pending: true,
  authenticated: false,
  alertMessage: undefined,
  alertType: undefined,
  authenticationLoad: true
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload
    },
    updateAdmin: (state, action) => {
      state.isAdmin = action.payload
    }
  },
  extraReducers: (builder) => {
    //
    //signupThunk
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.pending = false
      state.alertMessage = 'Your user has been created! Please go to login'
      state.alertType = 'success'
    }),
      builder.addCase(signupThunk.pending, (state) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(signupThunk.rejected, (state, action: AnyAction) => {
        state.pending = false
        state.authenticated = false
        state.alertMessage = action.payload
        state.alertType = 'error'
      }),
      //
      //loginThunk
      builder.addCase(loginThunk.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = true
        state.authenticationLoad = false
        state.alertMessage = "You've successfully logged in!"
        state.alertType = 'success'
        state.isAdmin = action.payload.isAdmin
      }),
      builder.addCase(loginThunk.pending, (state) => {
        state.pending = true
        state.authenticated = false
        state.authenticationLoad = true
      }),
      builder.addCase(loginThunk.rejected, (state, action: AnyAction) => {
        state.pending = false
        state.authenticated = false
        state.alertMessage = action.payload.message
        // state.alertMessage = action.payload.message
        state.alertType = 'error'
        state.authenticationLoad = false
      }),
      //
      //logoutThunk
      builder.addCase(logoutThunk.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = false
        state.alertMessage = action.payload.message
        state.alertType = 'success'
        state.isAdmin = false
      }),
      builder.addCase(logoutThunk.pending, (state) => {
        state.pending = true
        state.authenticated = false
      }),
      builder.addCase(logoutThunk.rejected, (state) => {
        state.pending = false
        state.authenticated = false
        state.isAdmin = false
      }),
      //
      //authenticateOnLoad
      builder.addCase(authenticateOnLoad.fulfilled, (state, action) => {
        state.pending = false
        state.authenticated = true
        state.pending = false
        state.authenticationLoad = false
        state.isAdmin = action.payload.isAdmin
      }),
      builder.addCase(authenticateOnLoad.pending, (state) => {
        state.pending = true
        state.authenticated = false
        state.authenticationLoad = true
      }),
      builder.addCase(authenticateOnLoad.rejected, (state) => {
        state.pending = false
        state.authenticated = false
        state.alertMessage = "It's been a while! Please login again "
        state.alertType = 'info'
        state.authenticationLoad = false
        state.isAdmin = false
      }),
      builder.addCase(updateRefreshToken.fulfilled, (state, action) => {
        state.isAdmin = action.payload.isAdmin
        state.pending = false
      }),
      builder.addCase(updateRefreshToken.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(updateRefreshToken.rejected, (state) => {
        state.pending = false
        state.authenticated = false
        state.alertMessage = "It's been a while! Please login again "
        state.alertType = 'info'
        state.authenticationLoad = false
        state.isAdmin = false
      })
  }
})

export const { setAlertMessage, updateAdmin } = authenticationSlice.actions

/* export const selectAuthentication = (state: authenticationSliceState) => state.authentication



 */

export const selectAuthentication = createSelector(
  (state: RootState) => state.authentication,
  (authentication) => authentication
)
