import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

import CalendarTest from '../calendar/calendar'

const StepDates = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <CalendarTest />
    </Flex>
  )
}

export default StepDates
