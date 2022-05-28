import { Button, Flex, Heading } from '@chakra-ui/react'
import { isDisabled } from '@chakra-ui/utils'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useSelector } from 'react-redux'

type props = {
  calenderDates: DateObject | DateObject[] | null
  setCalendarDates: Dispatch<SetStateAction<DateObject | DateObject[] | null>>
}

const StepDates = ({ calenderDates, setCalendarDates }: props) => {
  const format = 'YYYY-MM-DD'
  const currentDate = new Date()
  const allCurrentBookings = useSelector((state: any) => state.user.allUserBookings)

  /*   let testArray: DateObject[] = new Array()
   */ let testArray: string[] = new Array()

  /*   function formatDateObjects() {
    allCurrentBookings.forEach((booking: any) => {
      console.log(booking.bookedFor)
      const date_string = booking.bookedFor.toString()
      let testdate = new DateObject(date_string)
      testArray.push(testdate)
    })
    setCalendarDates(testArray)
  } */
  function formatDateObjects() {
    allCurrentBookings.forEach((booking: any) => {
      console.log(booking.bookedFor)

      const date = new Date(booking.bookedFor.toString())

      const hej = date.toLocaleString('en-GB', {
        // you can use undefined as first argument
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })

      const final = hej.replaceAll('/', '-')
      console.log('testArray single date ', final)

      testArray.push(final)
    })
    /*    setCalendarDates(testArray) */
  }

  useEffect(() => {
    console.log('BOOKINGS', allCurrentBookings)
    formatDateObjects()
  }, [allCurrentBookings])

  function handleSetCalendarDates(calenderDates: any) {
    console.log('did it change', calenderDates)

    setCalendarDates(calenderDates)
  }
  return (
    <Flex my={8} flexDir="column" justify="center" align="center" w={'100%'} h={'100%'}>
      <Heading mb={4} fontSize={'2xl'}>
        Select the dates you want a spot in the workspace.
      </Heading>

      <Flex w={'100%'} h={'100%'} flexDir="column" justifySelf="stretch" alignItems={'center'} py={{ base: '8', md: '4' }}>
        <Calendar
          mapDays={({ date }) => {
            let props: any = {}
            let isWeekend = [0, 6].includes(date.weekDay.index)

            if (isWeekend) props.className = 'highlight highlight-weekend'

            return props
          }}
          minDate={currentDate}
          className="test-class"
          value={calenderDates}
          onChange={setCalendarDates}
          format={format}
          sort
          multiple
          buttons={true}
          weekStartDayIndex={1}
          plugins={[<DatePanel header="Selected Dates" key={null} />]}
        />
      </Flex>
    </Flex>
  )
}

export default StepDates
