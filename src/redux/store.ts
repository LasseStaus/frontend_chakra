import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { authenticationSlice } from './authenticationSlice'
import { userSlice } from './userSlice'
export  const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
