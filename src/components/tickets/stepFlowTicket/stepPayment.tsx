import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { purchaseTicket } from '../../../redux/userActions'
// import { useAuth } from '../../../context/AuthContext'

interface Props {
  ticketType: '3 days' | '7 days' | '30 days'
}

const StepPaymentTicket = ({ ticketType }: Props) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  let amountOfTickets: number
  if (ticketType == '3 days') {
    amountOfTickets = 3
  } else if (ticketType == '7 days') {
    amountOfTickets = 7
  } else if (ticketType == '30 days') {
    amountOfTickets = 30
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Button onClick={() => dispatch(purchaseTicket(amountOfTickets))}>KØB</Button>
    </Flex>
  )
}

export default StepPaymentTicket
