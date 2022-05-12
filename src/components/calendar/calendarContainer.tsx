import { TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import CalendarModal from './calendarModal'

function Calendar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Container boxShadow={'lg'} maxW={'container.lg'}>
      <Flex flexDir={'column'} p={4}>
        <Flex gap={4} alignItems='center'>
          <TimeIcon width={30} height={30} />
          <Heading fontSize={'4xl'}>CPH Værkstedet lige nu</Heading>
        </Flex>
        {/* calendar */}

        <Box my={4} height={80} bg='orange.400'></Box>
        <Flex ml={'auto'} gap={4} justifySelf='flex-end'>
          {/*   <Button variant={'primary'} w='min-content'>
            Book with tickets
          </Button>
          <Button variant={'secondary'} w='min-content'>
            Book without tickets
          </Button> */}
          <Button onClick={onOpen}>Trigger modal</Button>
        </Flex>
      </Flex>
      <CalendarModal isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Calendar
