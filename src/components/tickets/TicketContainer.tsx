import { TimeIcon } from "@chakra-ui/icons"
import { Button, Container, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { useSelector } from "react-redux"
import TicketModal from "./TicketModal"

export interface TicketsProps {
  activeTickets: number
  usedTickets: number
}

export const Ticket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { activeTickets, usedTickets } = useSelector((state: any) => state.user.tickets)
  const purchaseData = useSelector((state: any) => state.user.purchases)

  const amountOfPurchases = purchaseData.length

  return (
    <Container boxShadow={"lg"} maxW={"container.lg"} bg="white">
      <Flex flexDir="column" p={4}>
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center">
            <TimeIcon width={30} height={30} />
            <Heading fontSize={"4xl"}>Tickets</Heading>
          </Flex>
          <Flex ml={"auto"} gap={4} justifySelf="flex-end">
            <Button onClick={onOpen}>Buy tickets</Button>
          </Flex>
        </Flex>
        <Flex flexDir={{ base: "column", md: "row" }} my={4} gap={8} height={80} align="center">
          <Flex flexDir="column" w={{ base: "100%", md: "33%" }} alignItems="center" justify="center" alignSelf="stretch" bg="#F2F2F2">
            <TimeIcon width={30} height={30} />
            <Text>{activeTickets}</Text>
            <Text>Active Tickets</Text>
          </Flex>
          <Flex flexDir="column" w={{ base: "100%", md: "33%" }} alignItems="center" justify="center" alignSelf="stretch" bg="#F2F2F2">
            <TimeIcon width={30} height={30} />
            <Text>{usedTickets}</Text>
            <Text>Used Tickets</Text>
          </Flex>
          <Flex flexDir="column" w={{ base: "100%", md: "33%" }} alignItems="center" justify="center" alignSelf="stretch" bg="#F2F2F2">
            <TimeIcon width={30} height={30} />
            <Text>{amountOfPurchases}</Text>
            <Text>Purchase of tickets</Text>
          </Flex>
        </Flex>
      </Flex>
      <TicketModal isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Ticket
