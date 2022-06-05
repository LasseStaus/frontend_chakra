import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
const StepPaymentTicket = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
      <Image src="/mobilepay_bg.png" alt="me" width="auto" height="150px" />
    </Flex>
  )
}

export default StepPaymentTicket
