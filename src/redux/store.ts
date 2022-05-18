import {configureStore } from '@reduxjs/toolkit'
import ThunkMiddleware  from 'redux-thunk'
import { userSlice } from './userSlice'

export  const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    middleware: [ThunkMiddleware],
})
