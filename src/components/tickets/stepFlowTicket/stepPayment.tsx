import { Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { purchaseTicket } from '../../../redux/userActions'

interface Props {
  typeOfTicket: string | undefined
}
const StepPaymentTicket = ({ typeOfTicket }: Props) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Image src="/mobilpay.jpeg" alt="me" width="100" height="300" />
    </Flex>
  )
}

export default StepPaymentTicket
