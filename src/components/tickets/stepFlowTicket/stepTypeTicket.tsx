import { Flex, Heading, Text } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { selectUser, TicketType } from '../../../redux/userSlice'

type Props = {
  typeOfTicket: string
  setTicketType: Dispatch<SetStateAction<string>>
}

const ticketCardStyle = {
  width: '100%',
  justify: 'center',
  align: 'center',
  bg: 'brandGrey',
  margin: '1rem',
  p: '4',
  borderRadius: '10px'
}

const ticketCardSelect = {
  border: '2px',
  borderColor: 'primary'
}

const StepTypeTicket = ({ typeOfTicket, setTicketType }: Props) => {
  const userState = useSelector(selectUser)

  return (
    <Flex my={{ base: 8, md: 2 }} flexDir="column" justify="center" align="center" w={'100%'} h={'100%'}>
      <Heading mb={4} fontSize={'2xl'}>
        Select the ticket type you want to purchase
      </Heading>
      <Flex w={'100%'} h={'100%'} flexDir={{ base: 'column', md: 'row' }} justifySelf="stretch" alignItems={'center'}>
        {userState.ticketTypes.map((ticketType: TicketType) => (
          <Flex
            key={ticketType.id}
            flexDir="column"
            pointerEvents="auto"
            {...ticketCardStyle}
            {...(typeOfTicket === ticketType.typeOfTicket && ticketCardSelect)}
            onClick={() => setTicketType(ticketType.typeOfTicket)}
          >
            <Heading color="primary" fontWeight="bold" textTransform="uppercase">
              {ticketType.typeOfTicket}
            </Heading>
            <Text fontSize="4xl">{ticketType.nowPrice},-</Text>
            <Text>NORMAL PRICE {ticketType.normalPrice},-</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default StepTypeTicket
