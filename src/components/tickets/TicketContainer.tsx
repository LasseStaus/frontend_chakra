import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { IoTicketOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'

export interface TicketsProps {
  activeTickets: number
  usedTickets: number
}

type Props = {
  onOpenTicket: () => void
}

export const Ticket = ({ onOpenTicket }: Props) => {
  const userState = useSelector(selectUser)
  return (
    <Container maxW={'container.lg'} bg="white" variant={'even'} borderRadius={6} shadow={'base'}>
      <Flex flexDir="column">
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center">
            <IoTicketOutline style={{ width: '40px', height: 'auto' }} />
            <Heading fontSize={'4xl'}>Tickets</Heading>
          </Flex>
          <Flex ml={'auto'} gap={4} justifySelf="flex-end">
            <Button onClick={onOpenTicket}>Buy tickets</Button>
          </Flex>
        </Flex>
        <Flex flexDir={{ base: 'column', md: 'row' }} my={4} gap={8} align="center">
          <Flex
            flexDir="column"
            w={{ base: '100%', md: '33%' }}
            h={{ base: '60vw', md: '18vw' }}
            alignItems="center"
            justify="center"
            alignSelf="stretch"
            bg="#F2F2F2"
          >
            <IoTicketOutline style={{ width: '30px', height: 'auto' }} />
            <Text fontSize="4xl">{userState.tickets.activeTickets}</Text>
            <Text fontWeight="bold" color="brandGreen" fontSize="md">
              Active Tickets
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            w={{ base: '100%', md: '33%' }}
            h={{ base: '60vw', md: '18vw' }}
            alignItems="center"
            justify="center"
            alignSelf="stretch"
            bg="#F2F2F2"
          >
            <IoTicketOutline style={{ width: '30px', height: 'auto' }} />
            <Text fontSize="4xl">{userState.tickets.usedTickets}</Text>
            <Text fontWeight="bold" color="primary" fontSize="md">
              Used Tickets
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            w={{ base: '100%', md: '33%' }}
            h={{ base: '60vw', md: '18vw' }}
            alignItems="center"
            justify="center"
            alignSelf="stretch"
            bg="#F2F2F2"
          >
            <AiOutlineCreditCard style={{ width: '25px', height: 'auto' }} />
            <Text fontSize="4xl">{userState.purchases.length}</Text>
            <Text fontWeight="bold" color="brandBlue" fontSize="md">
              Purchase of tickets
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Ticket
