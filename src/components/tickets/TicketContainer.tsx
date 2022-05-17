import { TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Heading, useDisclosure, Text, Center } from '@chakra-ui/react'
import React from 'react'
import TicketModal from './TicketModal'
import CalendarModal from './TicketModal'

const mockDataTickets = [{
  id: 297482719,
  activeTickets: 3,
  usedTickets: 0,
  userId: "bc761fa6-011b-443f-88ab-32062cf09192",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09192",
    firstname: "jens",
    lastname: "jensen",
  }
},
{
  id: 303484038,
  purchasedAt: 10029320,
  amountOfTickets: 7,
  paymentMethod: "mobilepay",
  userId: "bc761fa6-011b-443f-88ab-32062cf09187",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09187",
    firstname: "johnny",
    lastnaame: "johnsen",
  }
}]
const mockDataPurchase = [{
  id: 303484038,
  purchasedAt: 10029320,
  amountOfTickets: 7,
  paymentMethod: "mobilepay",
  userId: "bc761fa6-011b-443f-88ab-32062cf09192",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09192",
    firstname: "jens",
    lastname: "jensen",
  }
}, {
  id: 303484038,
  purchasedAt: 10029320,
  amountOfTickets: 7,
  paymentMethod: "mobilepay",
  userId: "bc761fa6-011b-443f-88ab-32062cf09192",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09192",
    firstname: "jens",
    lastname: "jensen",
  }
}, {
  id: 9495893829,
  purchasedAt: 10029320,
  amountOfTickets: 7,
  paymentMethod: "mobilepay",
  userId: "bc761fa6-011b-443f-88ab-32062cf09187",
  userObj: {
    userId: "bc761fa6-011b-443f-88ab-32062cf09187",
    firstname: "johnny",
    lastname: "johnsen",
  }
}]

export const Ticket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const userId = 'bc761fa6-011b-443f-88ab-32062cf09192'

  const filteredMockDataTickets = mockDataTickets.filter(
    (tickets) => tickets.userId === userId
  );
  const filteredMockDataPurchase = mockDataPurchase.filter(
    (purchase) => purchase.userId === userId
  );

  console.log("SE HER", filteredMockDataTickets);

  const { activeTickets, usedTickets } = filteredMockDataTickets[0]
  const userPurchases = filteredMockDataPurchase.length

  return (
    <Container boxShadow={'lg'} maxW={'container.lg'} bg='white'>
      <Flex flexDir="column" p={4}>
        <Flex alignItems='center'>
          <Flex gap={4} alignItems='center'>
            <TimeIcon width={30} height={30} />
            <Heading fontSize={'4xl'}>Tickets</Heading>
          </Flex>
          <Flex ml={'auto'} gap={4} justifySelf='flex-end'>
            <Button onClick={onOpen}>Buy tickets</Button>
          </Flex>
        </Flex>
        <Flex flexDir={{ base: 'column', md: "row" }} my={4} gap={8} height={80} align="center" >
          <Flex flexDir="column" w={{ base: '100%', md: "33%" }} alignItems="center" justify="center" alignSelf="stretch" bg="#F2F2F2">
            <TimeIcon width={30} height={30} />
            <Text>{activeTickets}</Text>
            <Text>Active Tickets</Text>
          </Flex>
          <Flex flexDir="column" w={{ base: '100%', md: "33%" }} alignItems="center" justify="center" alignSelf="stretch" bg="#F2F2F2">
            <TimeIcon width={30} height={30} />
            <Text>{usedTickets}</Text>
            <Text>Used Tickets</Text>
          </Flex>
          <Flex flexDir="column" w={{ base: '100%', md: "33%" }} alignItems="center" justify="center" alignSelf="stretch" bg="#F2F2F2">
            <TimeIcon width={30} height={30} />
            <Text>{userPurchases}</Text>
            <Text>Purchase of tickets</Text>
          </Flex>
        </Flex>
      </Flex>
      <TicketModal isOpen={isOpen} onClose={onClose} />
    </Container >
  )
}

export default Ticket
