import { createAsyncThunk } from '@reduxjs/toolkit'
import { authenticationSliceState } from './authenticationSlice'
import { Booking } from './userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_REST

export const getUserInfo = createAsyncThunk('loggedInUser/getUserInfo', async (_, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    }
  })
  const resData = await response.json()

  console.log('USER DATA RECIEVED IN FRONTEND ', resData)

  console.log(resData, 'use info')

  if (response.status === 200) {
    return resData
  } else {
    return // TO DO HERE?
  }
})

export const editUserInfo = createAsyncThunk('loggedInUser/editUserInfo', async (data: any, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  console.log('inEditUser', token)

  const response = await fetch(`${API_URL}/user/edit/userInfo`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()

  console.log(resData, 'update user')

  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const editUserPassword = createAsyncThunk('loggedInUser/editUserPassword', async (data: any, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/user/edit/password`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()

  if (response.status === 200) {
    return thunkAPI.fulfillWithValue(resData.message)
  } else {
    console.log('We are here')

    return thunkAPI.rejectWithValue(resData.message)
  }
})

// ==============================
// ============TICKET============
// ==============================

// getTicketTypes
// ================================================
export const getTicketTypes = createAsyncThunk('loggedInUser/getTicketTypes', async (_, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/ticket/ticketTypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    }
  })

  const resData = await response.json()

  console.log('IN getTicketTypes', resData)

  if (response.status === 200) {
    console.log('IN getTicketTypes OK', resData)
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const purchaseTicket = createAsyncThunk('loggedInUser/purchaseTicket', async (typeOfTicket: string | undefined, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/ticket/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify({
      typeOfTicket: typeOfTicket
    })
  })

  const resData = await response.json()
  console.log('IN purchaseTicket', resData)

  if (response.status === 200) {
    return { purchase: resData[0], ticket: resData[1] }
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

// ==============================
// ===========BOOKINGS===========
// ==============================

export const createBooking = createAsyncThunk('loggedInUser/createBooking', async (data: string[], thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }
  const response = await fetch(`${API_URL}/booking/createBooking`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()
  if (response.status === 201) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const deleteBooking = createAsyncThunk('loggedInUser/deleteBooking', async (booking: Booking, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  const response = await fetch(`${API_URL}/booking/deleteBooking`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify(booking)
  })

  const resData = await response.json()
  console.log(response.status)

  if (response.status === 201) {
    console.log('OK', resData)
    return resData
  } else {
    console.log('NOT OK', resData)

    return thunkAPI.rejectWithValue(resData.message)
  }
})

// getAllUserBookings
// ================================================
export const getAllUserBookings = createAsyncThunk('loggedInUser/getAllUserBookings', async (_, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }
  console.log(token)

  const response = await fetch(`${API_URL}/booking/allUserBookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    }
  })

  const resData = await response.json()

  console.log('IN getAllUserBookings', resData)

  if (response.status === 200) {
    console.log('IN getAllUserBookings OK', resData)
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const updateBookingWithiLOQKey = createAsyncThunk('loggedInUser/updateBookingWithiLOQKey', async (data: any, thunkAPI) => {
  const token = thunkAPI.getState() as { authentication: authenticationSliceState }

  console.log(data, 'update booking with key')

  const response = await fetch(`${API_URL}/booking/updateBooking`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token.authentication.tokens}`
    },
    body: JSON.stringify({
      id: data.bookingId,
      iLOQKey: data.iLOQKey
    })
  })

  const resData = await response.json()

  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})
