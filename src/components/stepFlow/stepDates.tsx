import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useBooking } from '../../context/bookingContext'

import CalendarTest from '../calendar/calendar'

type testObj = {}
const StepDates = () => {
  const format = 'YYYY-MM-DD'
  const [selectedDates, setSelectedDates] = useState<any>([])
  const [dates, setDates] = useState<DateObject | DateObject[] | null>()

  useEffect(() => {
    console.log('changes to dates ')
    console.log('changes to selectedDates', selectedDates)
  }, [dates, selectedDates])

  function handleDates() {
    if (dates) {
      console.log('handle these', dates)

      const stringify = JSON.stringify(dates)
      const parse = JSON.parse(stringify)
      console.log('PARSE', parse)

      for (const item in parse) {
        console.log(`${item}: ${parse[item]}`, 'single date')

        let key = item

        const dateUnix = `${parse[item]}`

        setSelectedDates([...selectedDates, dateUnix])
        const realDate = new Date(parseInt(dateUnix))

        const test = realDate.toISOString()
        let vaue = test

        console.log('ADD THIS', test)
      }
    } else if (!dates) {
      setSelectedDates({})
    }
    console.log('should be dne', selectedDates)
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Calendar value={dates} onChange={setDates} format={format} sort multiple plugins={[<DatePanel key={null} />]} />
      <Button onClick={handleDates} />
    </Flex>
  )
}

export default StepDates
