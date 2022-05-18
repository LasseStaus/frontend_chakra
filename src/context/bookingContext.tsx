import { time } from 'console'
import React, { createContext, useContext, useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000'

export interface bookingData {
  id: string
  bookedFor: string
  createdAt: string
  userId: string
}
export type BookingContextInterface = {
  booking: string | undefined
  isLoading: boolean
  createBooking: (selectedDates: any) => void
  getBookings: () => void
  userBookings: bookingData[] | undefined
  deleteBooking: (booking: bookingData | undefined) => void
}

export const BookingContextDefaultValues: BookingContextInterface = {
  booking: undefined,
  isLoading: false,
  createBooking: () => Promise.resolve(),
  getBookings: () => Promise.resolve(),
  userBookings: [],
  deleteBooking: () => Promise.resolve()
}
const BookingContext = createContext<BookingContextInterface>(BookingContextDefaultValues)

export function BookingProvider({ children }: any) {
  const [booking, setBookings] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [userBookings, setUserBookings] = useState<bookingData[] | undefined>()

  useEffect(() => {
    getBookings()
  }, [])
  //TODO type any needs to go
  const createBooking = async (selectedDates: any) => {
    console.log('FROM CONTEXT', selectedDates)
    /*     setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000) */
    const res = await fetch(`${API_URL}/api/createBooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedDates)
    })
    console.log('FROM CONTEXT HALLO')

    const data = await res.json()

    if (res.ok && data.ok) {
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)

      console.log('Context OK', data)
    } else {
      console.log('Context NOT OK', data)
    }
  }

  const getBookings = async () => {
    const res = await fetch(`${API_URL}/api/getuserbookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json()
    console.log('getBookings, contenxt', data)

    if (res.ok && data) {
      setUserBookings(data)
      return data
      console.log('Context OK', data)
    } else {
      console.log('Context GET BOOKINGS NOT OK', data)
    }
  }

  const deleteBooking = async (booking: bookingData | undefined) => {
    console.log('DELE THIS ID ', booking, JSON.stringify(booking))

    const res = await fetch(`${API_URL}/api/deleteBooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    })

    const data = await res.json()
    console.log('getBookings, contenxt', data)

    if (res.ok && data) {
      //TODO WHAT TO DO HERE
      console.log(typeof userBookings)

      console.log('BOOKING DELETED CONTEXT', data)

      getBookings()

      return data
      console.log('Context OK', data)
    } else {
      console.log('Context GET BOOKINGS NOT OK', data)
    }
  }
  const value = {
    booking,
    isLoading,
    createBooking,
    getBookings,
    userBookings,
    deleteBooking
  }
  return (
    <>
      <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
    </>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}

export default BookingContext
