import { createAsyncThunk } from "@reduxjs/toolkit"
import { authenticationSliceState } from "./authenticationSlice"

const API_URL = "http://localhost:3333"

export const getUserInfo = createAsyncThunk("loggedInUser/getUserInfo", async (_, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token.authentication.tokens}`
    }
  })
  const resData = await response.json()

  console.log(resData, "use info")

  if (response.status === 200) {
    console.log("status OK", resData)

    return resData
  } else {
    return
  }
})

export const editUserInfo = createAsyncThunk("loggedInUser/editUserInfo", async (data: any, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  console.log("inEditUser", token)

  const response = await fetch(`${API_URL}/user/edit/userInfo`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()

  console.log(resData, "update user")

  if (response.status === 200) {
    return resData
  } else {
    console.log(resData)

    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const editUserPassword = createAsyncThunk("loggedInUser/editUserPassword", async (data: any, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/user/edit/password`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()

  if (response.status === 200) {
    return thunkAPI.fulfillWithValue(resData.message)
  } else {
    console.log(resData)

    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const createBooking = createAsyncThunk("loggedInUser/createBooking", async (data: string[], thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  console.log("in creatbokiing api ", data);
  
  const response = await fetch(`${API_URL}/booking/createBooking`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()
console.log
  if (response.status === 200) {
    
    return thunkAPI.fulfillWithValue(resData.message)
  } else {
    console.log(resData)

    return thunkAPI.rejectWithValue(resData.message)
  }
})
