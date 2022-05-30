import { Button, Flex, Heading } from '@chakra-ui/react'
import { isDisabled } from '@chakra-ui/utils'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useSelector } from 'react-redux'
import { CalendarColorDescription } from '../calendar/calendarColorDesc'

type props = {
  calenderDates: DateObject | DateObject[] | null
  setCalendarDates: Dispatch<SetStateAction<DateObject | DateObject[] | null>>
}

const StepDates = ({ calenderDates, setCalendarDates }: props) => {
  const format = 'YYYY-MM-DD'
  const currentDate = new Date()
  const allCurrentBookings = useSelector((state: any) => state.user.allUserBookings)

  let dateArray: string[] = []

  allCurrentBookings?.forEach((currentBooking: { bookedFor: Date }) => {
    const dateString = new Date(currentBooking.bookedFor.toString())

    const date = dateString
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      .replaceAll('/', '-')

    dateArray.push(date)
  })

  return (
    <Flex my={8} flexDir="column" justify="center" align="center" w={'100%'} h={'100%'}>
      <Heading mb={4} fontSize={'2xl'}>
        Select the dates you want a spot in the workspace.
      </Heading>

      <Calendar
        mapDays={({ date }) => {
          let isBookedDates = dateArray.includes(date.format('DD-MM-YYYY'))

          if (isBookedDates) {
            return {
              disabled: true,
              style: { color: 'white', backgroundColor: 'rgb(223, 90, 90)' },
              onClick: () => alert('There are no avaliable bookings left for this date')
            }
          }
        }}
        minDate={currentDate}
        value={calenderDates}
        onChange={setCalendarDates}
        format={format}
        multiple
        sort
        buttons={true}
        plugins={[<DatePanel header="Selected Dates" key={null} />]}
      />
      <CalendarColorDescription />
    </Flex>
  )
}

export default StepDates
