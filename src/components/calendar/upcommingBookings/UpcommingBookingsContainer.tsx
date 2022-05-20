import { TimeIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  useDisclosure,
  Text,
  Center,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  TableContainer,
  Tbody,
  Td
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Booking } from '../../../redux/userSlice'

export const UpcommingBookings = () => {
  const { isOpen: isBookingOpen, onOpen: onBookingOpen, onClose: onBookingClose } = useDisclosure()
  const { isOpen: isPurchaseOpen, onOpen: onPurchaseOpen, onClose: onPurchaseClose } = useDisclosure()
  const { isOpen: isCancelBookingOpen, onOpen: onCancelBookingOpen, onClose: onCancelBookingClose } = useDisclosure()

  const bookings = useSelector((state: any) => state.user.bookings)

  function formatDate(currentDate: Date) {
    const formattedDate = new Date(currentDate).toLocaleDateString('da-DA', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })
    return formattedDate
  }

  const userBookings = ['asdasdsad', 'sadsadsad']
  /*   function openBooking(booking: bookingData) {
    console.log('bookingscontainer', booking)
   setCancelThisBooking(booking)
    onCancelBookingOpen()
  } */

  return (
    <Container boxShadow={'lg'} maxW={'container.lg'} bg="white">
      {/*   <Flex flexDir="column" p={4}>
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center">
            <TimeIcon width={30} height={30} />
            <Heading fontSize={'4xl'}>Upcomming Bookings</Heading>
          </Flex>
          <Flex ml={'auto'} gap={4} justifySelf="flex-end">
            <Button onClick={onPurchaseOpen}>Buy tickets</Button>
            <Button onClick={onBookingOpen}>Book time</Button>
          </Flex>
        </Flex>

        {userBookings != null && (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>VærkstedetCPH</Th>
                  <Th>Date</Th>
                  <Th>Created at</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {userBookings?.map((booking) => (
                  <Tr key={booking.id}>
                    <Td>Frederiksberg</Td>
                    <Td>{formatDate(booking.bookedFor)}</Td>
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
          </TableContainer>
        )}
      </Flex>
      <CancelBookingAlert
        booking={cancelThisBooking}
        isCancelBookingOpen={isCancelBookingOpen}
        onCancelBookingClose={onCancelBookingClose}
      />
      <CalendarModal isOpen={isBookingOpen} onClose={onBookingClose} /> */}
    </Container>
  )
}

export default UpcommingBookings
function getDisclosureProps() {
  throw new Error('Function not implemented.')
}
