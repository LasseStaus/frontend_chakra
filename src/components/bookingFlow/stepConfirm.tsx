import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ListItem from '../generic/listItem'
import formatDatesForScreen from '../helpers/formatDatesForScreen'

const StepConfirm = () => {
  const bookingsState = useSelector((state: any) => state.user.selectedBookings)
  const bookingsFormatted = formatDatesForScreen(bookingsState)
  const activeTickets = useSelector((state: any) => state.user.tickets.activeTickets)

  return (
    <Flex flexDir={'column'} w={'100%'} h={'100%'}>
      <Box>
        <Heading mb={4} fontSize={'2xl'}>
          The {bookingsFormatted.length === 1 ? 'date' : 'dates'} you have selected {bookingsFormatted.length === 1 ? 'is' : 'are'}
        </Heading>
        {bookingsFormatted.map((date: string) => (
          <ListItem key={date} element={date} />
        ))}
        <Text>Confirming this transaction, will use {bookingsFormatted.length} tickets</Text>
        <Text>Leaving you with {activeTickets - bookingsFormatted.length} tickets to spare </Text>
      </Box>
    </Flex>
  )
}

export default StepConfirm
