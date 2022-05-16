import React, { createContext, useContext, useState } from 'react'

const API_URL = 'http://localhost:3000'

export type BookingContextInterface = {
  booking: string | undefined
  createBooking: (selectedDates: any) => void
}

export const BookingContextDefaultValues: BookingContextInterface = {
  booking: undefined,
  createBooking: () => Promise.resolve(),
}
const BookingContext = createContext<BookingContextInterface>(BookingContextDefaultValues)

export function BookingProvider({ children }: any) {
  const [booking, setBookings] = useState<string>()

  console.log('In BookingProvider')

  const createBooking = async (selectedDates: any) => {
    console.log('FROM CONTEXT', selectedDates)

    const res = await fetch(`${API_URL}/api/createBooking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      console.log('UD MED DIG')
    } else {
      console.error('error logging out user')
    }
  }
  const value = {
    booking,
    createBooking,
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
