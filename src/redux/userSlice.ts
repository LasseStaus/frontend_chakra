import { AnyAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import {
  createBooking,
  deleteBooking,
  editUserInfo,
  editUserPassword,
  getAllUserBookings,
  getTicketTypes,
  getUserInfo,
  purchaseTicket,
  updateBookingWithiLOQKey
} from './userActions'

interface User {
  firstname: string
  lastname: string
  email: string
  phonenumber: number | null
}

export interface Tickets {
  activeTickets: number | null
  usedTickets: number | null
}

export interface Booking {
  id: string
  bookedFor: Date
  createdAt: Date
  userId: string
  iLOQKey?: string
}
interface Purchase {
  id: string
  purchasedAt: string
  amountOfTickets: string
  paymentMethod: string
  userId: string
}

export interface TicketType {
  id: string | null
  typeOfTicket: string
  nowPrice: number | null
  normalPrice: number | null
  ticketsAmount: number | null
}

export interface userSliceState {
  user: User
  tickets: Tickets
  ticketTypes: TicketType[]
  bookings: Booking[]
  allUserBookings: Booking[]
  selectedBookings: string[]
  purchases: Purchase[]
  pending: boolean
  alertMessage: string | undefined
  alertType: 'success' | 'error' | 'warning' | 'info' | undefined
}

const initialState: userSliceState = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: null
  },
  bookings: [],
  allUserBookings: [],
  selectedBookings: [],
  purchases: [],
  tickets: {
    activeTickets: null,
    usedTickets: null
  },
  ticketTypes: [],
  pending: true,
  alertMessage: undefined,
  alertType: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload
    },
    clearUserData: (state, action) => {
      state.user = initialState.user
      state.bookings = initialState.bookings
      state.purchases = initialState.purchases
      state.tickets = initialState.tickets
    },
    updateSelectedBookings: (state, action) => {
      state.selectedBookings = action.payload
    }
  },
  extraReducers: (builder) => {
    //
    //getUserInfo
    builder.addCase(getUserInfo.fulfilled, (state, action: AnyAction) => {
      state.user = {
        firstname: action.payload?.firstname,
        lastname: action.payload?.lastname,
        email: action.payload?.email,
        phonenumber: action.payload?.phonenumber
      }
      state.bookings = action.payload.bookings
      state.purchases = action.payload.purchase
      state.tickets = {
        activeTickets: action.payload.ticket.activeTickets,
        usedTickets: action.payload.ticket.usedTickets
      }
    }),
      builder.addCase(getUserInfo.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(getUserInfo.rejected, (state) => {
        state.pending = false
      }),
      //
      //editUserInfo
      builder.addCase(editUserInfo.fulfilled, (state, action: AnyAction) => {
        state.user = {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          phonenumber: action.payload.phonenumber
        }

        state.alertMessage = 'User information updated successfully'
        state.alertType = 'success'
      }),
      builder.addCase(editUserInfo.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(editUserInfo.rejected, (state, action: AnyAction) => {
        state.pending = false

        state.alertMessage = action.payload
        state.alertType = 'error'
      }),
      //
      //editUserPassword
      builder.addCase(editUserPassword.fulfilled, (state, action: AnyAction) => {
        console.log('password success')
        state.alertMessage = action.payload
        state.alertType = 'success'
      }),
      builder.addCase(editUserPassword.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(editUserPassword.rejected, (state, action: AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
      }),
      //
      //getTicketTypes
      builder.addCase(getTicketTypes.fulfilled, (state, action: AnyAction) => {
        console.log('getTicketTypes success', action.payload)
        state.ticketTypes = action.payload
      }),
      builder.addCase(getTicketTypes.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(getTicketTypes.rejected, (state) => {
        //TODO state
        // state.pending = false
        // state.alertMessage = action.payload
        // state.alertType = 'error'
      })
    //
    //purchaseTicket
    builder.addCase(purchaseTicket.fulfilled, (state, action: AnyAction) => {
      state.tickets = {
        activeTickets: action.payload.ticket.activeTickets,
        usedTickets: state.tickets?.usedTickets
      }
      state.purchases?.push(action.payload.purchase)
    }),
      builder.addCase(purchaseTicket.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(purchaseTicket.rejected, (state, action: AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
      }),
      //
      //createBooking
      builder.addCase(createBooking.fulfilled, (state, action: AnyAction) => {
        state.pending = false
        state.tickets = {
          activeTickets: action.payload.tickets.activeTickets,
          usedTickets: action.payload.tickets.usedTickets
        }
        state.bookings = action.payload.userBookings
        state.allUserBookings = action.payload.allUserBookings
      }),
      builder.addCase(createBooking.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(createBooking.rejected, (state) => {
        state.pending = false
      }),
      builder.addCase(deleteBooking.fulfilled, (state, action: AnyAction) => {
        const newBookings = state.bookings?.filter((booking) => booking.id !== action.payload.deletedBooking.id)
        state.bookings = newBookings
        state.tickets = {
          activeTickets: action.payload.updatedTickets.activeTickets,
          usedTickets: action.payload.updatedTickets.usedTickets
        }
        state.alertMessage = 'You have now canceled you booking'
        state.alertType = 'success'
        state.allUserBookings = action.payload.allUserBookings
      }),
      builder.addCase(deleteBooking.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(deleteBooking.rejected, (state, action: AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
      }),
      //
      //getAllUserBookings
      builder.addCase(getAllUserBookings.fulfilled, (state, action: AnyAction) => {
        console.log('getAllUserBookings success', action.payload)
        state.allUserBookings = action.payload
      }),
      builder.addCase(getAllUserBookings.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(getAllUserBookings.rejected, (state) => {
        //TODO state
        // state.pending = false
        // state.alertMessage = action.payload
        // state.alertType = 'error'
      })
    //
    //editUserInfo
    builder.addCase(updateBookingWithiLOQKey.fulfilled, (state, action: AnyAction) => {
      const booking = state.allUserBookings.find((booking) => booking.id === action.payload.id)
      if (booking) {
        booking.iLOQKey = action.payload.iLOQKey
      }
      state.alertMessage = 'User booking updated successfully'
      state.alertType = 'success'
    }),
      builder.addCase(updateBookingWithiLOQKey.pending, (state) => {
        state.pending = true
      }),
      builder.addCase(updateBookingWithiLOQKey.rejected, (state, action: AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
      })
  }
})

export const { setAlertMessage, updateSelectedBookings, clearUserData } = userSlice.actions

export const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
)
export const selectUserInfo = createSelector(
  (state: RootState) => state.user.user,
  (user) => user
)
