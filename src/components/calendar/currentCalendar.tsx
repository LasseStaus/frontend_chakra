import { background, Box, Button, Container, Flex, Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getAllUserBookings } from '../../redux/userActions'
import { IoMdTime } from 'react-icons/io'
import { CalendarColorDescription } from './calendarColorDesc'
interface calendarProps {
  numberOfMonths: number
}
const CurrentCalendar = ({ numberOfMonths }: calendarProps) => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUserBookings())
  }, [dispatch])

  const allCurrentBookings = useSelector((state: any) => state.user.allUserBookings)
  const currentDate = new Date()
  console.log(allCurrentBookings)

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

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW={'container.lg'} borderRadius={6} shadow={'base'} variant="lighterDarkMode">
      <Flex gap={2} alignItems="center">
        <IoMdTime style={{ width: '40px', height: 'auto' }} />
        <Heading variant={'componentHeader'}>Current availability</Heading>
      </Flex>
      <Flex className="frontpage-calendar" justifyContent={'center'} flexDir="column" alignItems={'center'} w={'100%'} h={'100%'}>
        <Calendar
          mapDays={({ date }) => {
            let isBookedDates = dateArray.includes(date.format('DD-MM-YYYY'))

            if (isBookedDates) {
              return {
                disabled: true,
                style: { color: 'white', backgroundColor: 'rgb(223, 90, 90)' }
              }
            }
          }}
          className={colorMode === 'light' ? '' : 'darkMode'}
          disabled={true}
          minDate={currentDate}
          numberOfMonths={numberOfMonths}
          weekStartDayIndex={1}
          readOnly={true}
        />
        <CalendarColorDescription />
      </Flex>
    </Container>
  )
}

export default CurrentCalendar
