import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function listItem({ element }: any) {
  return (
    <Box>
      <Text>{element}</Text>
    </Box>
  )
}
