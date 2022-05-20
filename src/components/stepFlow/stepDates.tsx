import { Flex } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
type props = {
  calenderDates: DateObject | DateObject[] | null
  setCalendarDates: Dispatch<SetStateAction<DateObject | DateObject[] | null>>
}
const StepDates = ({ calenderDates, setCalendarDates }: props) => {
  const format = 'YYYY-MM-DD'
  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
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
