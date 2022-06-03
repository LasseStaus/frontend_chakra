import React from 'react'
import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

export default function Logo(props: any) {
  return (
    <Flex alignItems="center" {...props}>
      <Image src="/lillelogo.png" alt="me" height={'50'} width={'50'} />
    </Flex>
  )
}
