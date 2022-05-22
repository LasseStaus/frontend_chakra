import { TimeIcon } from '@chakra-ui/icons'
import { Button, Container, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getAllUserBookings } from '../../redux/userActions'
import { formatDate } from '../helpers/formatSingleDate'
import UpdateBookingAlert from '../updateBookingAlert/UpdateBookingAlert'

export interface allUserBookingsData {
  id: string
  bookedFor: Date
  createdAt: Date
  userId: string
  iLOQKey?: string
  user?: {
    phonenumber: number
    email: string
  }
}

export const AdminBookingPanel = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const { isOpen: isUpdateBookingOpen, onOpen: onUpdateBookingOpen, onClose: onUpdateBookingClose } = useDisclosure()

  const [updateBooking, setUpdateBooking] = useState<allUserBookingsData | undefined>(undefined)
  const bookings = useSelector((state: any) => state.user.allUserBookings)

  function openModal(booking: allUserBookingsData) {
    setUpdateBooking(booking)
    onUpdateBookingOpen()
  }

  useEffect(() => {
    dispatch(getAllUserBookings())
  }, [dispatch])

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
              {bookings?.map((booking: allUserBookingsData) => (
                <Tr key={booking.id}>
                  <Td>{formatDate(booking.bookedFor)}</Td>
                  <Td>Frederiksberg</Td>

                  <Td>
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
      <UpdateBookingAlert booking={updateBooking} isUpdateBookingOpen={isUpdateBookingOpen} onUpdateBookingClose={onUpdateBookingClose} />
    </Container>
  )
}

export default AdminBookingPanel
