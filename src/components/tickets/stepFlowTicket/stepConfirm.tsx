import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  typeOfTicket: string
}

const StepConfirmTicket = ({ typeOfTicket }: Props) => {
  return (
    <Flex py={12} px={{ base: 4, md: 8 }} flexDir="column" justify="center" align="center">
      <Heading fontSize="xl" color="primary" fontWeight="bold" textTransform="uppercase" mb="10">
        Your purchase was successfull
      </Heading>
      <Box>
        <Box>
          <Heading>Purchase of Ticket card</Heading>
          <Text>Ticket type: {typeOfTicket}</Text>
        </Box>
        <Divider m={4} />
        <Box>
          <Heading>Payment</Heading>
          <Text>Sum: {typeOfTicket}</Text>
          <Text>Payment method: Mobilepay</Text>
          <Text>{new Date().toDateString()}</Text>
        </Box>
        <Divider m={4} />
        <Box>
          <Heading>Questions or Help?</Heading>
          <Text>
            If you have questions regaring the refund policy or need any help in relation to wrong a wrong purchase or booking, please
            contact VærkstedetCPH
          </Text>
          <Text>Email: vaerkstedetcph@gmail.com </Text>
          <Text>Adress: Langelands Plads 4, 2000 Frederiksberg </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default StepConfirmTicket
