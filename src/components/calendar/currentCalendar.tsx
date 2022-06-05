import { Container, Flex, Heading, useColorMode } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { IoMdTime } from 'react-icons/io'
import { Calendar } from 'react-multi-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getAllUserBookings } from '../../redux/userActions'
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

  const { colorMode } = useColorMode()

  return (
    <Container maxW={'container.lg'} borderRadius={6} shadow={'base'} variant="lighterDarkMode">
      <Flex gap={2} alignItems="center">
        <IoMdTime style={{ width: '35px', height: 'auto' }} />
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
