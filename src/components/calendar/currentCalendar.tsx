import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getAllUserBookings } from '../../redux/userActions'

/* import Responsive from "react-responsive";
export const Mobile = props => <Responsive {...props} maxWidth={767} />;
export const Default = props => <Responsive {...props} minWidth={768} />; */
const CurrentCalendar = () => {
  const format = 'YYYY-MM-DD'
  const currentDate = new Date()

  const dispatch: AppDispatch = useDispatch()

  const allBookings = useSelector((state: any) => state.user.allUserBookings)

  const [calenderDates, setCalendarDates] = useState<DateObject | DateObject[] | null>(null)
  let testArray: DateObject[] = new Array()

  function formatDateObjects() {
    console.log('All bookings', allBookings)
    allBookings.forEach((booking: any) => {
      console.log(booking.bookedFor)
      const date_string = booking.bookedFor.toString()
      let testdate = new DateObject(date_string)
      testArray.push(testdate)
    })
    console.log('after foreach', testArray)
    console.log('before setting', calenderDates)
    setCalendarDates(testArray)
    console.log('After setting', calenderDates)
  }

  useEffect(() => {
    dispatch(getAllUserBookings())
  }, [dispatch])

  useEffect(() => {
    console.log('BOOKINGS', allBookings)
    formatDateObjects()
  }, [allBookings])

  return (
    <Container maxW={'container.lg'} bg="white" variant={'even'} borderRadius={6} shadow={'base'}>
      <Flex className="frontpage-calendar" justifyContent={'center'} flexDir="column" alignItems={'center'} w={'100%'} h={'100%'}>
        <Heading mb={4} fontSize={'2xl'}>
          Current avaliability
        </Heading>
        <Calendar
          mapDays={({ date }) => {
            let props: any = {}
            let isTaken = [0, 365].includes(date.weekDay.number)

            if (isTaken) props.className = 'highlight highlight-weekend'

            return props
          }}
          minDate={currentDate}
          className="test-class"
          value={calenderDates}
          disabled={true}
          numberOfMonths={2}
          buttons={true}
          weekStartDayIndex={1}
          readOnly={false}
          plugins={[<DatePanel header="Selected Dates" key={null} />]}
        />
      </Flex>
    </Container>
  )
}

export default CurrentCalendar
