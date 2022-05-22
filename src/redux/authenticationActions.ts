import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = "http://localhost:3000"
export const loginThunk = createAsyncThunk("authentication/login", async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const resData = await response.json()

  if (response.status === 200) {
    console.log("loginData", resData)

    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const signupThunk = createAsyncThunk("authentication/signup", async (data: any, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const resData = await response.json()
  if (response.status === 200) {
    return resData
  } else {
    console.log(resData)

    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const logoutThunk = createAsyncThunk("authentication/logout", async (_, thunkAPI) => {
  console.log("lougt createasync")
  const response = await fetch(`${API_URL}/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const resData = await response.json()
  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const authenticateOnLoad = createAsyncThunk("authentication/authenticateOnLoad", async (data, thunkAPI) => {
  const response = await fetch(`${API_URL}/api/authenticateOnLoad`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const resData = await response.json()
  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData)
  }
})
