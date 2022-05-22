import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
const StepConfirm = () => {
  const { pending } = useSelector((state: any) => state.user.pending)
  return (
    <Box>
      {pending ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'}>
          VIRKELIG FEDT, DU HAR FÅET TID
        </Flex>
      )}
    </Box>
  )
}

export default StepConfirm
