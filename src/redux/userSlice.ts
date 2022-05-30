import { AnyAction, createSelector, createSlice, SerializedError } from '@reduxjs/toolkit'
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
  firstname: string | undefined
  lastname: string | undefined
  email: string | undefined
  phonenumber: number | undefined
}

export interface Tickets {
  activeTickets:  number | undefined
  usedTickets:  number | undefined
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
  id: string | undefined
  typeOfTicket: string
  nowPrice: number | undefined
  normalPrice: number | undefined
  ticketsAmount: number | undefined
}

export interface userSliceState {
  user: User | undefined
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
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phonenumber: undefined
  },
  bookings: [],
  allUserBookings: [],
  selectedBookings: [],
  purchases: [],
  tickets: {
    activeTickets: undefined,
    usedTickets: undefined
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
    updateSelectedBookings: (state, action) => {
      state.selectedBookings = action.payload
    }
  },
  extraReducers: (builder) => {
    //
    //getUserInfo
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
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
      builder.addCase(getUserInfo.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(getUserInfo.rejected, (state, action) => {
        state.pending = false
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      //
      //editUserInfo
      builder.addCase(editUserInfo.fulfilled, (state, action) => {
        state.user = {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          phonenumber: action.payload.phonenumber
        }

        state.alertMessage = 'User information updated successfully'
        state.alertType = 'success'
      }),
      builder.addCase(editUserInfo.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(editUserInfo.rejected, (state, action:AnyAction) => {
        state.pending = false
 
        
        state.alertMessage = action.payload
        state.alertType = 'error'
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      //
      //editUserPassword
      builder.addCase(editUserPassword.fulfilled, (state, action:AnyAction) => {
        console.log('password success')
        state.alertMessage = action.payload
        state.alertType = 'success'
      }),
      builder.addCase(editUserPassword.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(editUserPassword.rejected, (state, action:AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      //
      //getTicketTypes
      builder.addCase(getTicketTypes.fulfilled, (state, action) => {
        console.log('getTicketTypes success', action.payload)
        state.ticketTypes = action.payload
      }),
      builder.addCase(getTicketTypes.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(getTicketTypes.rejected, (state, action) => {
        // state.pending = false
        // state.alertMessage = action.payload
        // state.alertType = 'error'
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      })
    //
    //purchaseTicket
    builder.addCase(purchaseTicket.fulfilled, (state, action) => {
      state.tickets = {
        activeTickets: action.payload.ticket.activeTickets,
        usedTickets: state.tickets.usedTickets
      }
      state.purchases.push(action.payload.purchase)
    }),
      builder.addCase(purchaseTicket.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(purchaseTicket.rejected, (state, action:AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      //
      //createBooking
      builder.addCase(createBooking.fulfilled, (state, action) => {
        state.pending = false
        state.tickets = {
          activeTickets: action.payload.tickets.activeTickets,
          usedTickets: action.payload.tickets.usedTickets
        }
        state.bookings = action.payload.userBookings
        state.allUserBookings = action.payload.allUserBookings
      }),
      builder.addCase(createBooking.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(createBooking.rejected, (state, action) => {
        state.pending = false

        // state.user = state.user - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(deleteBooking.fulfilled, (state, action) => {


        console.log("delete booking case", action.payload);

        
        console.log("full state", state)
        console.log("the state before", state.bookings)

 /*        const exists = state.bookings.find((booking) => ) */
        const newBookings = state.bookings.filter((booking) => booking.id !== action.payload.deletedBooking.id)
        state.bookings = newBookings
        console.log("the state after", state.bookings )
        state.tickets = {
          activeTickets: action.payload.updatedTickets.activeTickets,
          usedTickets: action.payload.updatedTickets.usedTickets
        }
  /*       state.allUserBookings = action.payload.allUserBookings */
        state.alertMessage = 'You have now canceled you booking'
        state.alertType = 'success'
      }),
      builder.addCase(deleteBooking.pending, (state, action) => {
        state.pending = true
      }),
      builder.addCase(deleteBooking.rejected, (state, action:AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
      }),
      //
      //getAllUserBookings
      builder.addCase(getAllUserBookings.fulfilled, (state, action) => {
        console.log('getAllUserBookings success', action.payload)
        state.allUserBookings = action.payload
      }),
      builder.addCase(getAllUserBookings.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(getAllUserBookings.rejected, (state, action) => {
        // state.pending = false
        // state.alertMessage = action.payload
        // state.alertType = 'error'
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      })
    //
    //editUserInfo
    builder.addCase(updateBookingWithiLOQKey.fulfilled, (state, action) => {
      const booking = state.allUserBookings.find((booking) => booking.id === action.payload.id)
      if (booking) {
        booking.iLOQKey = action.payload.iLOQKey
      }
      state.alertMessage = 'User booking updated successfully'
      state.alertType = 'success'
    }),
      builder.addCase(updateBookingWithiLOQKey.pending, (state, action) => {
        state.pending = true
        // state.user = undefined - WHAT TO DO HERE? // TO DO
      }),
      builder.addCase(updateBookingWithiLOQKey.rejected, (state, action:AnyAction) => {
        state.pending = false
        state.alertMessage = action.payload
        state.alertType = 'error'
        // state.user = state.user - WHAT TO DO HERE? // TO DO
      })
  }
})
// export const {} = userSlice.actions

export const { setAlertMessage, updateSelectedBookings } = userSlice.actions

export const selectUser  = createSelector((state: RootState) => state.user, user => user)
export const selectUserInfo  = createSelector((state: RootState) => state.user.user, user => user)

// export const selectUser = (state: any) => state.user.user
