import { time } from 'console'
import React, { createContext, useContext, useState } from 'react'

const API_URL = 'http://localhost:3000'

export type BookingContextInterface = {
  booking: string | undefined
  isLoading: boolean
  createBooking: (selectedDates: any) => void
}

export const BookingContextDefaultValues: BookingContextInterface = {
  booking: undefined,
  isLoading: false,
  createBooking: () => Promise.resolve()
}
const BookingContext = createContext<BookingContextInterface>(BookingContextDefaultValues)

export function BookingProvider({ children }: any) {
  const [booking, setBookings] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  console.log('In BookingProvider')

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

    if (res.ok && data) {
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
      console.log('Context OK', data)
    } else {
      console.log('Context NOT OK', data)
    }
  }
  const value = {
    booking,
    isLoading,
    createBooking
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
