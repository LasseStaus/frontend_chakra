import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import { useBooking } from '../../context/bookingContext'
const StepConfirm = (selectedDates: any) => {
  const { createBooking, isLoading } = useBooking()

  console.log('stepend', selectedDates)
  createBooking(selectedDates)

  return (
    <Box>
      {isLoading ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
          VIRKELIG FEDT, DU HAR FÅET TID
        </Flex>
      )}
    </Box>
  )
}

export default StepConfirm
