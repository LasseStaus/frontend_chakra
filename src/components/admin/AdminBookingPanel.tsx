import { Button, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getAllBookingsWithUserInfo } from '../../redux/userActions'
import { selectUser } from '../../redux/userSlice'
import { formatDate } from '../helpers/formatSingleDate'
import UpdateBookingAlert from '../updateBookingAlert/UpdateBookingAlert'

export interface allUserBookingsData {
  id: string
  bookedFor: Date
  createdAt: Date
  userId?: string
  iLOQKey?: string
  user?: {
    phonenumber: number | null
    email: string
  }
}

export const AdminBookingPanel = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const { isOpen: isUpdateBookingOpen, onOpen: onUpdateBookingOpen, onClose: onUpdateBookingClose } = useDisclosure()
  const userState = useSelector(selectUser)
  const [updateBooking, setUpdateBooking] = useState<allUserBookingsData>({
    id: '',
    bookedFor: new Date(),
    createdAt: new Date(),
    userId: ''
  })

  function openModal(booking: allUserBookingsData) {
    setUpdateBooking(booking)
    onUpdateBookingOpen()
  }

  useEffect(() => {
    dispatch(getAllBookingsWithUserInfo())
  }, [dispatch])

  return (
    <>
      <Flex flexDir="column" p={4}>
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center" w="full">
            <AiOutlineCalendar style={{ width: '40px', height: 'auto' }} />
            <Heading variant={'componentHeader'}>All Bookings</Heading>
          </Flex>
        </Flex>

        <TableContainer>
          <Table variant="adminTable" size={'lg'}>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>VærkstedetCPH</Th>
                <Th>User phone</Th>
                <Th>User email</Th>
                <Th>Created at</Th>
                <Th>iLOQ key</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userState.allBookingsWithUserInfo?.map((booking: allUserBookingsData) => (
                <Tr key={booking.id}>
                  <Td>{formatDate(booking.bookedFor)}</Td>
                  <Td>Frederiksberg</Td>

                  <Td>{booking?.user?.phonenumber}</Td>
                  <Td>{booking?.user?.email}</Td>
                  <Td>{formatDate(booking.createdAt)}</Td>
                  <Td>
                    {booking.iLOQKey ? (
                      booking.iLOQKey
                    ) : (
                      <Button width={'100%'} variant="outline" borderColor={'blacklAlpha.300'} onClick={() => openModal(booking)}>
                        Assign key
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <UpdateBookingAlert booking={updateBooking} isUpdateBookingOpen={isUpdateBookingOpen} onUpdateBookingClose={onUpdateBookingClose} />
    </>
  )
}

export default AdminBookingPanel
