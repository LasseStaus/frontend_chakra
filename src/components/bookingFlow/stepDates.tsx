import { Button, Flex, Heading } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
type props = {
  calenderDates: DateObject | DateObject[] | null
  setCalendarDates: Dispatch<SetStateAction<DateObject | DateObject[] | null>>
}
const StepDates = ({ calenderDates, setCalendarDates }: props) => {
  const format = 'YYYY-MM-DD'
  const currentDate = new Date()

  return (
    <Flex justifyContent={'center'} flexDir="column" alignItems={'center'} w={'100%'} h={'100%'}>
      <Heading mb={4} fontSize={'2xl'}>
        Select the dates you want a spot in the workspace.
      </Heading>
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
  )
}

export default StepDates
