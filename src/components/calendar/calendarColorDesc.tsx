import { Box, Flex, Text } from '@chakra-ui/react'

export const CalendarColorDescription = () => {
  return (
    <Flex justify="start" w="full" pl={4} gap={4} mt={4}>
      <Flex>
        <Box borderRadius="100" w="30px" h="20px" backgroundColor="brandRed" mr={2} />
        <Text>Fully booked</Text>
      </Flex>
      <Flex>
        <Box borderRadius="100" w="30px" h="20px" border="1px solid black" backgroundColor="white" mr={2} />
        <Text>Available</Text>
      </Flex>
    </Flex>
  )
}
