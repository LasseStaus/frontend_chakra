import { Button, Flex } from '@chakra-ui/react'
import React, { Dispatch, ReactEventHandler, SetStateAction, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

type props = {
  selectedDates: [] | string[] | {}
  setSelectedDates: Dispatch<SetStateAction<[] | string[]>>
}

const StepDates = ({ selectedDates, setSelectedDates }: props) => {
  const format = 'YYYY-MM-DD'
  console.log('dafault', selectedDates)
  const [dates, setDates] = useState<DateObject | DateObject[] | null>()

  let testarray: Array<string> = new Array()

  function handleDates() {
    if (dates) {
      const stringify = JSON.stringify(dates)
      const parse = JSON.parse(stringify)
      for (const item in parse) {
        console.log(`${item}: ${parse[item]}`, 'single date')
        const dateUnix = `${parse[item]}`
        const realDate = new Date(parseInt(dateUnix))
        const test = realDate.toISOString()
        testarray.push(test)
      }
    } else if (!dates) {
      return
    }

    setSelectedDates(testarray)
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Calendar value={dates} onChange={setDates} format={format} sort multiple plugins={[<DatePanel key={null} />]} />
      <Button onClick={handleDates}>Submit</Button>
    </Flex>
  )
}

export default StepDates
