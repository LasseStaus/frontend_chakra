import {
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToken
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Booking, selectUser } from '../../redux/userSlice'
import CancelBookingAlert from '../cancelBookingAlert/CancelBookingAlert'
import { formatDate } from '../helpers/formatSingleDate'
import { AiOutlineCalendar } from 'react-icons/ai'
import { AiFillCalendar } from 'react-icons/ai'

type Props = {
  onBookingOpen: () => void
}

export const UpcommingBookings = ({ onBookingOpen }: Props) => {
  const userState = useSelector(selectUser)

  // const { isOpen: isPurchaseOpen, onOpen: onPurchaseOpen, onClose: onPurchaseClose } = useDisclosure()
  const { isOpen: isCancelBookingOpen, onOpen: onCancelBookingOpen, onClose: onCancelBookingClose } = useDisclosure()

  const [cancelThisBooking, setCancelThisBooking] = useState<Booking | undefined>(undefined)

  function openBooking(booking: Booking) {
    setCancelThisBooking(booking)
    onCancelBookingOpen()
  }

  const bgT = useToken('colors', useColorModeValue('initial', 'dCord5'))

  return (
    <Container maxW={'container.lg'} borderRadius={6} shadow={'base'} variant="lighterDarkMode">
      <Flex flexDir="column">
        <Flex flexDirection={{ sm: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
          <Flex gap={4} alignItems="center" w="full">
            <AiOutlineCalendar style={{ width: '35px', height: 'auto' }} />
            <Heading variant={'componentHeader'}>Upcoming bookings</Heading>
          </Flex>
          <Flex ml={{ lg: 'auto' }} gap={4} w={{ base: 'full', md: 'auto' }} mt={{ base: '4', md: '0' }}>
            <Button shadow={'base'} width={'auto'} onClick={onBookingOpen} alignItems="center">
              <Icon as={AiFillCalendar} mr={2} />
              New booking
            </Button>
          </Flex>
        </Flex>
        <TableContainer mt={8}>
          <Table variant="adminTable" size={'md'} colorScheme="gray">
            <Thead>
              <Tr>
                <Th>V??rkstedetCPH</Th>
                <Th>Date</Th>
                <Th>iLOQ key</Th>
                <Th>Created at</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {userState.bookings.length > 0 &&
                userState.bookings.map((booking: Booking) => (
                  <Tr key={booking.id}>
                    <Td bg={bgT + '!important'}>Frederiksberg</Td>
                    <Td bg={bgT + '!important'}>{formatDate(booking.bookedFor)}</Td>
                    <Td bg={bgT + '!important'}>
                      {booking.iLOQKey ? (
                        booking.iLOQKey
                      ) : (
                        <Text fontSize="md" as="span" color="#A9A9A9">
                          On its way..
                        </Text>
                      )}
                    </Td>
                    <Td bg={bgT + '!important'}>{formatDate(booking.createdAt)}</Td>
                    <Td bg={bgT + '!important'}>
                      <Button color="brandRed" variant="warning" onClick={() => openBooking(booking)}>
                        Cancel Booking
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {!userState.bookings.length && (
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
    </Container>
  )
}

export default UpcommingBookings
