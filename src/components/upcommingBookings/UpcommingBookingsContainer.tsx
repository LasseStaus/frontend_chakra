import { TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Booking } from '../../redux/userSlice'
import CancelBookingAlert from '../cancelBookingAlert/CancelBookingAlert'
import { formatDate } from '../helpers/formatSingleDate'
import CalendarModal from '../calendar/calendarModal'

export const UpcommingBookings = () => {
  const bookings = useSelector((state: any) => state.user.bookings)

  const { isOpen: isBookingOpen, onOpen: onBookingOpen, onClose: onBookingClose } = useDisclosure()
  // const { isOpen: isPurchaseOpen, onOpen: onPurchaseOpen, onClose: onPurchaseClose } = useDisclosure()
  const { isOpen: isCancelBookingOpen, onOpen: onCancelBookingOpen, onClose: onCancelBookingClose } = useDisclosure()

  const [cancelThisBooking, setCancelThisBooking] = useState<Booking | undefined>(undefined)

  function openBooking(booking: Booking) {
    console.log('bookingscontainer', booking)
    setCancelThisBooking(booking)
    onCancelBookingOpen()
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container maxW={'container.lg'} bg="white" variant={'even'} borderRadius={6} shadow={'base'}>
      <Flex flexDir="column">
        <Flex flexDirection={{ sm: 'column-reverse', lg: 'row' }}>
          <Flex gap={4} alignItems="center">
            <TimeIcon width={30} height={30} />
            <Heading variant={'componentHeader'}>Upcomming Bookings</Heading>
          </Flex>
          <Flex ml={{ lg: 'auto' }} gap={4}>
            <Button shadow={'base'} width={'auto'} onClick={onBookingOpen}>
              New booking
            </Button>
            <Button shadow={'base'}>Buy tickets</Button>
          </Flex>
        </Flex>
        <TableContainer mt={8}>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>VærkstedetCPH</Th>
                <Th>Date</Th>
                <Th>iLOQ key</Th>
                <Th>Created at</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings.length > 0 &&
                bookings.map((booking: Booking) => (
                  <Tr key={booking.id}>
                    <Td>Frederiksberg</Td>
                    <Td>{formatDate(booking.bookedFor)}</Td>
                    <Td>{booking.iLOQKey ? booking.iLOQKey : 'On its way..'}</Td>
                    <Td>{formatDate(booking.createdAt)}</Td>
                    <Td>
                      <Button variant="linkButton" onClick={() => openBooking(booking)}>
                        Cancel Booking
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {!bookings.length && (
            <Flex justifyContent={'start'} m="4" pt={10}>
              You have no upcoming bookings..
            </Flex>
          )}
        </TableContainer>
      </Flex>
      <CancelBookingAlert
        booking={cancelThisBooking}
        isCancelBookingOpen={isCancelBookingOpen}
        onCancelBookingClose={onCancelBookingClose}
      />
      <CalendarModal isOpen={isBookingOpen} onClose={onBookingClose} />
    </Container>
  )
}

export default UpcommingBookings
