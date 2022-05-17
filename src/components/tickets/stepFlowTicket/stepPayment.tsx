import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'

interface Props {
  ticketType: "3 days" | "7 days" | "30 days"
}

const StepPaymentTicket = ({ ticketType }: Props) => {

  const { purchaseTicket } = useAuth()


  let amountOfTickets: number | null
  if (ticketType === "3 days") {
    amountOfTickets = 3
  } else if (ticketType === "7 days") {
    amountOfTickets = 7
  } else if (ticketType === "30 days") {
    amountOfTickets = 30
  } else amountOfTickets = null


  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Button onClick={() => purchaseTicket(amountOfTickets)}>KØB</Button>
    </Flex>
  )
}

export default StepPaymentTicket
