import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ListItem from '../generic/listItem'
import formatDatesForScreen from '../helpers/formatDatesForScreen'

const StepConfirm = () => {
  const bookingsState = useSelector((state: any) => state.user.bookings)
  const bookingsFormatted = formatDatesForScreen(bookingsState)
  return (
    <Flex flexDir={'column'} w={'100%'} h={'100%'}>
      CNNFIRM PURCHASE
      <Heading>
        Du har valgt {bookingsFormatted.length} {bookingsFormatted.length === 1 ? 'dato' : 'datoer'}
      </Heading>
      {bookingsFormatted.map((date: string) => (
        <ListItem key={date} element={date} />
      ))}
    </Flex>
  )
}

export default StepConfirm
