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
    <Flex justifyContent={'center'} flexDir="column" alignItems={'center'} w={'100%'} h={'100%'}>
      <Heading mb={4} fontSize={'2xl'}>
        Select the dates you want a spot in the workspace.
      </Heading>

      <Calendar
        mapDays={({ date }) => {
          const dateReformatted = date.format('DD-MM-YYYY')

          /*         const exists = testArray.find((item) => dateReformatted === item)
            if (exists) console.log('i want to black out this date', exists)  */

          let isWeekend = testArray.includes(dateReformatted)
          /*     if (isWeekend) console.log('black out this date', dateReformatted)
          
          if (testArray.includes(dateReformatted)) {
            return {
              disabled: true,
              style: { color: 'white', backgroundColor: 'rgb(223, 90, 90)' },
              onClick: () => alert('There are no avaliable bookings left for this date')
            }
          } */
          /*     testArray.forEach((dateObj) => {})
          let props: any = {}
          let isWeekend = [0, 6].includes(date.weekDay.index)

          if (isWeekend) props.className = 'highlight highlight-weekend'
 */
          /*     return props */

          testArray.forEach((e) => {
            // console.log('THIS IS HERE', e)

            let isWeekend = [0, 6].includes(date.weekDay.index)

            // console.log('LOoking for', date.toString())

            //   if (isWeekend) props.className = 'highlight highlight-red'

            return props
          })

          let props: any = {}

          let isTaken = [0, 365].includes(date.weekDay.number)

          if (testArray.includes(dateReformatted)) {
            return {
              disabled: true,
              style: { color: 'white', backgroundColor: 'rgb(223, 90, 90)' },
              onClick: () => alert('There are no avaliable bookings left for this date')
            }
            /*        
       
            
            const dateReformatted = date.format('DD-MM-YYYY')
            props.style = { color: 'white', backgroundColor: 'rgb(223, 90, 90)' }
            props.disabled */
          }

          return props
        }}
        displayWeekNumbers={true}
        minDate={currentDate}
        digits={['hello']}
        value={calenderDates}
        //  onChange={(e) => handleSetCalendarDates(calenderDates)}
        onChange={setCalendarDates}
        format={format}
        multiple
        sort
        buttons={true}
        plugins={[<DatePanel header="Selected Dates" key={null} />]}
      />
    </Flex>
  )
}

export default StepDates
