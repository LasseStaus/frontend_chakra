import { Box, Divider, Flex, Heading, Text, Center } from '@chakra-ui/react'
import React from 'react'

interface Props {
  typeOfTicket: '3 days' | '7 days' | '30 days'
}

const StepConfirmTicket = ({ typeOfTicket }: Props) => {
  //TODO needs real data instead of new date
  const date = new Date().toDateString()

  return (
    <Box py={12} px={8} w="70%" h="100%">
      <Box>
        <Heading>Purchase of Ticket card</Heading>
        <Text>Ticket type: {typeOfTicket}</Text>
      </Box>
      <Divider m={4} />
      <Box>
        <Heading>Payment</Heading>
        <Text>Sum: {typeOfTicket}</Text>
        <Text>Payment method: Mobilepay</Text>
        <Text>{date}</Text>
      </Box>
      <Divider m={4} />
      <Box>
        <Heading>Questions or Help?</Heading>
        <Text>
          If you have questions regaring the refund policy or need any help in relation to wrong a wrong purchase or booking, please contact
          VærkstedetCPH
        </Text>
        <Text>Email: vaerkstedetcph@gmail.com </Text>
        <Text>Adress: Langelands Plads 4, 2000 Frederiksberg </Text>
      </Box>
    </Box>
  )
}

export default StepConfirmTicket
