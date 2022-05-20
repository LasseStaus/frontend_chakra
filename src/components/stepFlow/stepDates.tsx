import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useSelector } from 'react-redux'
type props = {
  calenderDates: DateObject | DateObject[] | null
  setCalendarDates: Dispatch<SetStateAction<DateObject | DateObject[] | null>>
}
const StepDates = ({ calenderDates, setCalendarDates }: props) => {
  const format = 'YYYY-MM-DD'
  return (
    <Flex justifyContent={'center'} flexDir="column" alignItems={'center'} w={'100%'} h={'100%'}>
      <Heading mb={4} fontSize={'2xl'}>
        Select the dates you want a spot in the workspace.
      </Heading>
      <Calendar
        className="test-class"
        value={calenderDates}
        onChange={setCalendarDates}
        format={format}
        sort
        multiple
        plugins={[<DatePanel key={null} />]}
      />
    </Flex>
  )
}

export default StepDates
