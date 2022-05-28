import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { purchaseTicket } from '../../../redux/userActions'

interface Props {
  typeOfTicket: '3 days' | '7 days' | '30 days'
}

//TODO chhange stuff
const StepPaymentTicket = ({ typeOfTicket }: Props) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Button onClick={() => dispatch(purchaseTicket(typeOfTicket))}>KØB</Button>
    </Flex>
  )
}

export default StepPaymentTicket
