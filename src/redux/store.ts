import {configureStore } from '@reduxjs/toolkit'
import ThunkMiddleware  from 'redux-thunk'
import { authenticationSlice } from './authenticationSlice'
import logger from 'redux-logger'
export  const store = configureStore({
    reducer: {
        user: authenticationSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
