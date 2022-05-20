import { TimeIcon } from '@chakra-ui/icons'
import { Button, Container, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../../context/AuthContext'
import { bookingData } from '../../context/bookingContext'
import CalendarModal from '../calendar/calendarModal'
import UpdateBookingAlert from '../updateBookingAlert/UpdateBookingAlert'

const getAllUserBookings = async () => {
  const res = await fetch(`api/getAllUserBookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()
  console.log(data)

  if (res.ok && data) {
    return data
  } else {
    console.log('wrong')
  }
}

export interface allUserBookingsData {
  id: string
  bookedFor: string
  createdAt: string
  userId: string
  iLOQKey?: string
  user?: {
    phonenumber: number
    email: string
  }
}

export const AllBookings = () => {
  const { isOpen: isBookingOpen, onOpen: onBookingOpen, onClose: onBookingClose } = useDisclosure()
  const { isOpen: isPurchaseOpen, onOpen: onPurchaseOpen, onClose: onPurchaseClose } = useDisclosure()
  const { isOpen: isUpdateBookingOpen, onOpen: onUpdateBookingOpen, onClose: onUpdateBookingClose } = useDisclosure()

  const [booking, setBoooking] = useState<allUserBookingsData | undefined>(undefined)
  const [bookings, setBookings] = useState<[allUserBookingsData] | undefined>(undefined)

  function formatDate(currentDate: string) {
    const date = new Date(currentDate)

    const formattedDate = date.toLocaleDateString('da-DA', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })
    return formattedDate
  }

  useEffect(() => {
    getAllUserBookings().then((data) => setBookings(data))
  }, [])

  console.log('ADMIN', bookings)
  function openModal(booking: bookingData) {
    console.log('bookingscontainer', booking)
    setBoooking(booking)
    onUpdateBookingOpen()
  }

  return (
    <Container boxShadow={'lg'} maxW={'container.lg'} bg="white">
      <Flex flexDir="column" p={4}>
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center">
            <TimeIcon width={30} height={30} />
            <Heading fontSize={'4xl'}>All Bookings</Heading>
          </Flex>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>VærkstedetCPH</Th>
                <Th>iLOQ key</Th>
                <Th>User phone</Th>
                <Th>User email</Th>
                <Th>Created at</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {bookings?.map((booking) => (
                <Tr key={booking.id}>
                  <Td>{formatDate(booking.bookedFor)}</Td>
                  <Td>Frederiksberg</Td>

                  <Td>
                    {' '}
                    {booking.iLOQKey ? (
                      booking.iLOQKey
                    ) : (
                      <Button variant="linkButton" onClick={() => openModal(booking)}>
                        Assign key
                      </Button>
                    )}
                  </Td>
                  <Td>{booking?.user?.phonenumber}</Td>
                  <Td>{booking?.user?.email}</Td>
                  <Td>{formatDate(booking.createdAt)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <UpdateBookingAlert booking={booking} isUpdateBookingOpen={isUpdateBookingOpen} onUpdateBookingClose={onUpdateBookingClose} />
      <CalendarModal isOpen={isBookingOpen} onClose={onBookingClose} />
    </Container>
  )
}

export default AllBookings
