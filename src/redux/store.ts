import {configureStore } from '@reduxjs/toolkit'
import ThunkMiddleware  from 'redux-thunk'
import { userSlice } from './userSlice'
import logger from 'redux-logger'
export  const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
