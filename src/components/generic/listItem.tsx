import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function listItem({ element }: any) {
  return (
    <Box>
      <Text fontSize={'1xl'}>{element}</Text>
    </Box>
  )
}
