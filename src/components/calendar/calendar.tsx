import type { Value } from 'react-multi-date-picker'

import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useEffect, useState, useRef } from 'react'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_fa from 'react-date-object/locales/gregorian_en'
import { Box } from '@chakra-ui/react'
export default function CalendarTest() {
  const date = new Date()
  const format = 'dd/MM/YYYY'
  const calenderRef = useRef<any>()
  //const test = new DateObject()

  const [dates, setDates] = useState<Value>()

  //unix time in milliseconds (August 21 2020)

  useEffect(() => {
    console.log(typeof dates)

    const test = new DateObject().format('YYYY-MM-DD:hh')

    console.log(test, 'test')

    //console.log(dates?.toString())
    if (dates) {
      console.log(dates, typeof dates)

      const realFormat = dates.toLocaleString()
      const numbers = JSON.stringify(dates)

      const test = console.log('realforat', realFormat, typeof realFormat)
      console.log('numbers', numbers, typeof numbers)
    }
  }, [dates])
  return (
    <>
      <Box>
        <Calendar value={dates} onChange={setDates} format={format} sort multiple />
      </Box>
      <Box>
        {dates?.toString()}
        {/*  {dates?.map((date: any, index: any) => (
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
