import { Button, Container, Flex, Heading, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { IoTicket, IoTicketOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'

type Props = {
  onOpenTicket: () => void
}

interface TicketItemProps {
  amountOfTickets: number | undefined
  text: string
  textColor: string
}

const TicketItem: React.FC<TicketItemProps> = ({ amountOfTickets, text, textColor }) => {
  return (
    <Flex
      flexDir="column"
      width={'100%'}
      py={{ sm: 4, lg: 14 }}
      alignItems="center"
      justify="center"
      alignSelf="stretch"
      bg={useColorModeValue('#F2F2F2', 'dCord5')}
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
        <Flex flexDir={{ sm: 'column', md: 'row' }}>
          <Flex gap={4} alignItems="center">
            <IoTicketOutline style={{ width: '35px', height: 'auto' }} />
            <Heading variant={'componentHeader'}>Tickets</Heading>
          </Flex>
          <Flex ml={{ md: 'auto' }} gap={4} justifySelf={{ lg: 'flex-end' }}>
            <Button mt={{ sm: 4, md: 0 }} onClick={onOpenTicket}>
              <Icon as={IoTicket} mr={2} />
              Buy tickets
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir={{ base: 'column', md: 'row' }} my={4} gap={8} align="center">
          <TicketItem amountOfTickets={userState.tickets.activeTickets} text="Active Tickets" textColor="brandGreen" />
          <TicketItem amountOfTickets={userState.tickets.usedTickets} text="Used Tickets" textColor="primary" />
          <TicketItem amountOfTickets={userState.purchases.length} text="Purchase of tickets" textColor="brandBlue" />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Ticket
