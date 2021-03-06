import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCookieFetcher } from './cookieHelpers/getCookiesFetcher'
import { Booking } from './userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_REST

interface editUserData {
  firstname?: string
  lastname?: string
  email?: string
}
interface editPasswordData {
  passwordCurrent: string
  passwordNew: string
  passwordNewConfirm: string
}

interface updateKeyData {
  bookingId: string
  iLOQKey: string
}
export const getUserInfo = createAsyncThunk('loggedInUser/getUserInfo', async (_, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
    }
  })
  const resData = await response.json()

  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue('Could not get user info')
  }
})

export const editUserInfo = createAsyncThunk('loggedInUser/editUserInfo', async (data: editUserData, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/user/edit/userInfo`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
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

export const editUserPassword = createAsyncThunk('loggedInUser/editUserPassword', async (data: editPasswordData, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/user/edit/password`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
    },
    body: JSON.stringify(data)
  })

  const resData = await response.json()

  if (response.status === 200) {
    return thunkAPI.fulfillWithValue(resData.message)
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

// ==============================
// ============TICKET============
// ==============================

export const getTicketTypes = createAsyncThunk('loggedInUser/getTicketTypes', async (_, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/ticket/ticketTypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
    }
  })

  const resData = await response.json()

  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const purchaseTicket = createAsyncThunk('loggedInUser/purchaseTicket', async (typeOfTicket: string, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/ticket/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
    },
    body: JSON.stringify({
      typeOfTicket: typeOfTicket
    })
  })

  const resData = await response.json()

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
  const cookies = await getCookieFetcher()
  const response = await fetch(`${API_URL}/booking/createBooking`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
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
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/booking/deleteBooking`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
    },
    body: JSON.stringify(booking)
  })

  const resData = await response.json()

  if (response.status === 201) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const getAllUserBookings = createAsyncThunk('loggedInUser/getAllUserBookings', async (_, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/booking/allUserBookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
    }
  })

  const resData = await response.json()

  if (response.status === 200) {
    return resData
  } else {
    return thunkAPI.rejectWithValue(resData.message)
  }
})

export const updateBookingWithiLOQKey = createAsyncThunk('loggedInUser/updateBookingWithiLOQKey', async (data: updateKeyData, thunkAPI) => {
  const cookies = await getCookieFetcher()

  const response = await fetch(`${API_URL}/booking/updateBooking`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookies.AT}`
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
