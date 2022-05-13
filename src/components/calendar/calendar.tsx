import type { Value } from 'react-multi-date-picker'

import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useEffect, useState, useRef } from 'react'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_fa from 'react-date-object/locales/gregorian_en'
import { Box, Button } from '@chakra-ui/react'
import { useBooking } from '../../context/bookingContext'

export default function CalendarTest() {
  const date = new Date()
  const format = 'YYYY-MM-DD'
  const { booking, createBooking } = useBooking()
  const [dates, setDates] = useState<DateObject | DateObject[] | null>()

  const [selectedDates, setSelectedDates] = useState<any>([])

  //unix time in milliseconds (August 21 2020)

  function sendIt() {
    createBooking(selectedDates)
  }
  useEffect(() => {
    console.log('NEW SELECTED DATES', selectedDates)
  }, [selectedDates])

  function handleDates() {
    console.log(dates)

    console.log('WE WANT THIS', dates?.toLocaleString)

    if (dates) {
      const asRealFormat = dates?.toLocaleString()
      //console.log(asRealFormat)

      const stringify = JSON.stringify(dates)

      console.log('Stringify', stringify)

      const parse = JSON.parse(stringify)

      console.log(parse, typeof parse)
      for (const item in parse) {
        console.log(`${item}: ${parse[item]}`, 'single date')
        const dateUnix = `${parse[item]}`
        const realDate = new Date(parseInt(dateUnix))
        const test = realDate.toISOString()
        console.log(test, 'realdate')
        console.log('LOOKING IN THIS', selectedDates, typeof selectedDates)

        /* const exists = selectedDates.find((element: string) => element}) */
        /*         if (selectedDates) {
          console.log('IT CONTAINS IT')
          const { test, ...rest } = selectedDates
          setSelectedDates(rest)
          console.log(selectedDates)
        } else {
        } */
        setSelectedDates([...selectedDates, test])
        console.log(selectedDates)
      }
    }
    /*     const date = new Date(parse) */
  }
  useEffect(() => {
    console.log('useffect', dates)

    handleDates()

    //   console.log(typeof dates)

    /*   const asRealFormat = dates?.toLocaleString() */
    //console.log(asRealFormat)

    /*     const stringify = JSON.stringify(dates)

    const parse = JSON.parse(stringify) */
    // console.log(parse)
    /* 
    const date = new Date(parse) */

    //console.log('Date: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())

    //console.log(test, 'test')

    //console.log(dates?.toString())
    /*   for (date in dates) {
    }

    dates?.forEach((e) => {
      console.log(e)
    }) */
    if (dates) {
      //   console.log(dates, typeof dates)

      const realFormat = dates.toLocaleString()
      const numbers = JSON.stringify(dates)

      // const test = console.log('realforat', realFormat, typeof realFormat)
      // console.log('numbers', numbers, typeof numbers)
    }

    /*     handleDates(dates) */
  }, [dates])

  const test = new DateObject()
  return (
    <>
      <Box>
        <Calendar value={dates} onChange={setDates} format={format} sort multiple plugins={[<DatePanel key={null} />]} />
      </Box>
      <Box>
        {/* {dates?.toString()}
        {dates?.map((date: any, index: any) => (
          <li key={index}>{date.format()}</li>
        ))} */}
      </Box>
    </>
  )
} /* import DatePicker, { CalendarProps, CalendarType } from 'rsingeact-calendar'

<DatePicker calendar={gregorian} ref={calenderRef} locale={gregorian_fa} value={dates} format='MMMM DD YYYY' sort multiple format='dddd DD MMMM YYYY' onChange={setDates} plugins={[<DatePanel position='right' key={null} />]} />

import React, { useState } from 'react'
import Calendar from 'react-calendar'

export default function CalendarTest() {
  const [value, onChange] = useState(new Date())

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  )
} */
/* export default function Example(props: CalendarProps) {
  return <DatePicker controls={['calendar']} selectMultiple={true} selectCounter={true} />
} */

/* import React, { useRef, useState } from 'react'

import MultipleDatePicker, { DateObject } from 'react-multi-date-picker'
import type { Value } from 'react-multi-date-picker'

import DatePicker from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

export default function Example() {
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([today, tomorrow])

  return <DatePicker format='YYYY-MM-DD-hh' multiple value={values} plugins={[<DatePanel key={null} />]} />
}
/* export default function CalendarTest() {
  const [value, setValue] = useState<Value>()
  const [open, setOnOpen] = useState<boolean>(true)

  const test = 'styles.css'
  return (
    <>
      <MultipleDatePicker onOpen={setOnOpen} numberOfMonths={1} multiple={true} value={value} onChange={setValue} />
    </>
  )
} 
 */
