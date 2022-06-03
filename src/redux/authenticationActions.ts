import { createAsyncThunk } from '@reduxjs/toolkit'
import { SetCookie } from './cookieHelpers/setCookies'
import clearCookiesHandler from '../pages/api/clearCookies'
import getCookiesHandler from '../pages/api/getCookies'
import { getCookieFetcher } from './cookieHelpers/getCookiesFetcher'

const API_URL = process.env.NEXT_PUBLIC_API_PROXY
const API_URL_REST = process.env.NEXT_PUBLIC_API_REST

export const loginThunk = createAsyncThunk('authentication/login', async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL_REST}/auth/local/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const responseData = await response.json()

  if (response.status === 200) {
    SetCookie(responseData.tokens)
    return responseData
  } else {
    console.log('HALLO', responseData)
    return thunkAPI.rejectWithValue(responseData)
  }
})

export const signupThunk = createAsyncThunk('authentication/signup', async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const resData = await response.json()
  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue('sdasdasd')
  }
})

export const logoutThunk = createAsyncThunk('authentication/logout', async (_, thunkAPI) => {
  const cookies = getCookieFetcher()

  console.log('LOGOUT COOKIES', await cookies)

  // const response = await fetch(`${API_URL}/api/logout`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // const resData = await response.json()
  // if (response.status === 200) {
  //   // clearCookiesHandler
  //   return resData
  // } else {
  //   return thunkAPI.rejectWithValue(resData.message)
  // }
})

export const authenticateOnLoad = createAsyncThunk('authentication/authenticateOnLoad', async (data, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/authenticateOnLoad`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const resData = await response.json()
  console.log('HELLO SLICE 1')

  if (response.status === 200) {
    console.log('HELLO SLICE 2')
    return resData
  } else {
    const errorMessage: string = resData.message
    return thunkAPI.rejectWithValue(errorMessage)
  }
})

export const updateRefreshToken = createAsyncThunk('authentication/updateRefreshToken', async (_, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/updateRefreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await response.json()
  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData)
  }
})
