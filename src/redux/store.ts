import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { authenticationSlice } from './authenticationSlice'
export  const store = configureStore({
    reducer: {
        user: authenticationSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
