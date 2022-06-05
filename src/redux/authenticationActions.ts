import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { clearCookiesFetcher } from './cookieHelpers/clearCookiesFetcher'
import { getCookieFetcher } from './cookieHelpers/getCookiesFetcher'
import { setCookieFetcher } from './cookieHelpers/setCookiesFetcher'
import { getUserInfo } from './userActions'
import { clearUserData } from './userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_REST

export const loginThunk = createAsyncThunk('authentication/login', async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/auth/local/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const responseData = await response.json()

  if (response.status === 200) {
    await setCookieFetcher(responseData.tokens)
    return responseData
  } else {
    return thunkAPI.rejectWithValue(responseData)
  }
})

export const signupThunk = createAsyncThunk('authentication/signup', async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/auth/local/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  } else {
    return thunkAPI.rejectWithValue(responseData.message)
  }
})

export const logoutThunk = createAsyncThunk('authentication/logout', async (_, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies.AT}`
    }
  })

  if (response.ok) {
    await clearCookiesFetcher() // TO DO
    thunkAPI.dispatch(clearUserData(undefined))
    return { message: 'You have been logged out!' }
  } else {
    return thunkAPI.rejectWithValue('Logout fail')
  }
})

export const authenticateOnLoad = createAsyncThunk('authentication/authenticateOnLoad', async (_, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies?.RT} `
    }
  })
  const responesData = await response.json()

  if (response.ok) {
    await setCookieFetcher(responesData.tokens)
    return responesData
  } else {
    return thunkAPI.rejectWithValue(responesData.message)
  }
})

export const updateRefreshToken = createAsyncThunk('authentication/updateRefreshToken', async (_, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookies?.RT} `
    }
  })
  const responesData = await response.json()

  if (response.ok && responesData.tokens) {
    console.log('UpdatRefesh success')

    await setCookieFetcher(responesData.tokens)
    return responesData
  } else {
    return thunkAPI.rejectWithValue(responesData.message)
  }
})
