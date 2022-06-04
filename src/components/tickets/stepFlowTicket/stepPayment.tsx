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
      <Image src="/mobilepay_bg.png" alt="me" width="auto" height="150px" />
    </Flex>
  )
}

export default StepPaymentTicket
