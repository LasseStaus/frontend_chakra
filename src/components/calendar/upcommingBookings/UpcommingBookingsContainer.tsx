import { TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Heading, useDisclosure, Text, Center, Table, TableCaption, Thead, Tr, Th, TableContainer, Tbody, Td } from '@chakra-ui/react'
import React from 'react'

interface mockDataProps {
  id: number,
  bookedFor: Date,
  createdAt: Date,
  userId: string,
  userObj: {
    userId: string,
    firstname: string,
    lastname: string,
    lastnaame?: undefined,
  }
}

const mockDataBookings: mockDataProps[] = [{
  id: 297482719,
  bookedFor: new Date('Mon May 20 2022 12:21:15 GMT+0200'),
  createdAt: new Date("Mon May 3 2022 12:21:15 GMT+0200"),
  userId: "bc761fa6-011b-443f-88ab-32062cf09192",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09192",
    firstname: "jens",
    lastname: "jensen",
  }
},
{
  id: 297482719,
  bookedFor: new Date("Mon May 30 2022 12:21:15 GMT+0200"),
  createdAt: new Date("Mon May 10 2022 12:21:15 GMT+0200"),
  userId: "bc761fa6-011b-443f-88ab-32062cf09192",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09192",
    firstname: "jens",
    lastname: "jensen",
  }
},
{
  id: 297482719,
  bookedFor: new Date("Mon June 21 2022 12:21:15 GMT+0200"),
  createdAt: new Date("Mon May 16 2022 12:21:15 GMT+0200"),
  userId: "bc761fa6-011b-443f-88ab-32062cf09192",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09192",
    firstname: "jens",
    lastname: "jensen",
  }
}]


export const UpcommingBookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const userId = 'bc761fa6-011b-443f-88ab-32062cf09192'

  const sortedBookings = mockDataBookings.sort((a, b) => a.bookedFor.getTime() - b.bookedFor.getTime())
  const filteredBookings = sortedBookings.filter(
    (bookings) => bookings.userId === userId
  );


  function formatDate(currentDate: Date) {
    const formattedDate = currentDate.toLocaleDateString('da-DA', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })
    return formattedDate
  }


  return (
    <Container boxShadow={'lg'} maxW={'container.lg'} bg='white'>
      <Flex flexDir="column" p={4}>
        <Flex alignItems='center'>
          <Flex gap={4} alignItems='center'>
            <TimeIcon width={30} height={30} />
            <Heading fontSize={'4xl'}>Upcomming Bookings</Heading>
          </Flex>
          <Flex ml={'auto'} gap={4} justifySelf='flex-end'>
            <Button onClick={onOpen}>Buy tickets</Button>
          </Flex>
        </Flex>
        <TableContainer>
          <Table variant='striped' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th>VærkstedetCPH</Th>
                <Th>Date</Th>
                <Th>Created at</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredBookings?.map((booking) =>
                <Tr>
                  <Td>Frederiksberg</Td>
                  <Td>{formatDate(booking.bookedFor)}</Td>
                  <Td>{formatDate(booking.createdAt)}</Td>
                  <Td> <Button variant="linkButton">Cancel Booking</Button></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Container >
  )
}

export default UpcommingBookings
