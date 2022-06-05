import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { getUserInfo } from './userActions'
import { clearUserData } from './userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_PROXY

export const loginThunk = createAsyncThunk('authentication/login', async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/login`, {
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
    console.log('HALLO', resData)
    return thunkAPI.rejectWithValue(resData)
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
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const logoutThunk = createAsyncThunk('authentication/logout', async (_, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  const resData = await response.json()

  if (response.status === 200) {
    thunkAPI.dispatch(clearUserData(undefined))
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
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
