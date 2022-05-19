import { TimeIcon } from "@chakra-ui/icons"
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
} from "@chakra-ui/react"
import React from "react"
import { useSelector } from "react-redux"
import { Booking } from "../../../redux/userSlice"

export const UpcommingBookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bookings = useSelector((state: any) => state.user.bookings)

  function formatDate(currentDate: Date) {
    const formattedDate = new Date(currentDate).toLocaleDateString("da-DA", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit"
    })
    return formattedDate
  }

  return (
    <Container boxShadow={"lg"} maxW={"container.lg"} bg="white">
      <Flex flexDir="column" p={4}>
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center">
            <TimeIcon width={30} height={30} />
            <Heading fontSize={"4xl"}>Upcomming Bookings</Heading>
          </Flex>
          <Flex ml={"auto"} gap={4} justifySelf="flex-end">
            <Button onClick={onOpen}>Buy tickets</Button>
          </Flex>
        </Flex>
        <TableContainer>
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
              {bookings.map((booking: Booking) => (
                <Tr key={booking.id}>
                  <Td>Frederiksberg</Td>
                  <Td>{formatDate(booking.bookedFor)}</Td>
                  <Td>{booking.iLOQKey ? booking.iLOQKey : "On its way.."}</Td>
                  <Td>{formatDate(booking.createdAt)}</Td>
                  <Td>
                    {" "}
                    <Button variant="linkButton">Cancel Booking</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  )
}

export default UpcommingBookings
