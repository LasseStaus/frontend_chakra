import { Button, Container, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
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

interface TicketItemProps {
  amountOfTickets: number
  text: string
  textColor: string
}

const TicketItem: React.FC<TicketItemProps> = ({ amountOfTickets, text, textColor }) => {
  return (
    <Flex
      flexDir="column"
      w={{ base: '100%', md: '33%' }}
      h={{ base: '60vw', md: '18vw' }}
      alignItems="center"
      justify="center"
      alignSelf="stretch"
      bg={useColorModeValue('#F2F2F2', 'brandDark.100')}
    >
      <IoTicketOutline style={{ width: '30px', height: 'auto' }} />
      <Text fontSize="4xl">{amountOfTickets}</Text>
      <Text fontWeight="bold" color={textColor} fontSize="md">
        {text}
      </Text>
    </Flex>
  )
}

export const Ticket = ({ onOpenTicket }: Props) => {
  const userState = useSelector(selectUser)
  return (
    <Container maxW={'container.lg'} variant="lighterDarkMode" borderRadius={6} shadow={'base'}>
      <Flex flexDir="column">
        <Flex alignItems="center">
          <Flex gap={4} alignItems="center">
            <IoTicketOutline style={{ width: '40px', height: 'auto' }} />
            <Heading variant={'componentHeader'}>Tickets</Heading>
          </Flex>
          <Flex ml={'auto'} gap={4} justifySelf="flex-end">
            <Button onClick={onOpenTicket}>Buy tickets</Button>
          </Flex>
        </Flex>
        <Flex flexDir={{ base: 'column', md: 'row' }} my={4} gap={8} align="center">
          <TicketItem amountOfTickets={activeTickets} text="Active Tickets" textColor="brandGreen" />
          <TicketItem amountOfTickets={usedTickets} text="Used Tickets" textColor="primary" />
          <TicketItem amountOfTickets={amountOfPurchases} text="Purchase of tickets" textColor="brandBlue" />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Ticket
