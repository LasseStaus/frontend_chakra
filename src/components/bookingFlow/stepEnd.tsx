import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import ListItem from '../generic/listItem'
import { Spinner } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import formatDatesForScreen from '../helpers/formatDatesForScreen'
const StepConfirm = () => {
  const { pending } = useSelector((state: any) => state.user.pending)
  const bookingsState = useSelector((state: any) => state.user.selectedBookings)
  const bookingsFormatted = formatDatesForScreen(bookingsState)
  return (
    <Box>
      {pending ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <Flex py={12} px={{ base: 4, md: 8 }} flexDir="column" justify="center" align="center">
          <Heading fontSize="xl" color="primary" fontWeight="bold" textTransform="uppercase" mb="10">
            Your booking was successfull
          </Heading>
          <Box>
            <Box>
              <Heading>Booking confirmation</Heading>
              <Text>Booked dates:</Text>
              {bookingsFormatted.map((date: string) => (
                <ListItem key={date} element={date} />
              ))}
            </Box>
            <Divider m={4} />
            <Box>
              <Text>Payment method: Tickets</Text>
              <Text>{new Date().toDateString()}</Text>
            </Box>
            <Divider m={4} />
            <Box>
              <Heading>Questions or Help?</Heading>
              <Text>
                If you have questions regaring the refund policy or need any help in relation to wrong a wrong purchase or booking, please
                contact VærkstedetCPH
              </Text>
              <Text>Email: vaerkstedetcph@gmail.com </Text>
              <Text>Adress: Langelands Plads 4, 2000 Frederiksberg </Text>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default StepConfirm
