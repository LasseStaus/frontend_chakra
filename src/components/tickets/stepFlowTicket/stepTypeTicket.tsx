import { Box, Button, color, Flex, Heading, Text } from '@chakra-ui/react'
import React, { Dispatch, ReactEventHandler, SetStateAction, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useSelector } from 'react-redux'
import { TicketType } from '../../../redux/userSlice'

type Props = {
  ticketType: '3 days' | '7 days' | '30 days'
  setTicketType: Dispatch<SetStateAction<'3 days' | '7 days' | '30 days'>>
}

const ticketCardStyle = {
  width: '100%',
  justify: 'center',
  align: 'center',
  bg: 'brandGrey',
  margin: '1rem',
  p: '4',
  borderRadius: '10px'
}

const ticketCardSelect = {
  border: '2px',
  borderColor: 'primary'
}

const StepTypeTicket = ({ ticketType, setTicketType }: Props) => {
  const ticketTypeData = useSelector((state: any) => state.user.ticketTypes)

  const ticketType3days = ticketTypeData.filter((ticket: TicketType) => ticket.ticketType === '3 days')[0]
  const ticketType7days = ticketTypeData.filter((ticket: TicketType) => ticket.ticketType === '7 days')[0]
  const ticketType30days = ticketTypeData.filter((ticket: TicketType) => ticket.ticketType === '30 days')[0]

  return (
    <Flex flexDir={{ base: 'column', md: 'row' }} justifySelf="stretch" alignItems={'center'} w={'100%'} h={'100%'}>
      <Flex
        flexDir="column"
        pointerEvents="auto"
        {...ticketCardStyle}
        {...(ticketType === '3 days' && ticketCardSelect)}
        onClick={() => setTicketType('3 days')}
      >
        <Heading>{ticketType3days.ticketType}</Heading>
        <Text>{ticketType3days.nowPrice},-</Text>
        <Text>NORMALPRIS {ticketType3days.normalPrice},-</Text>
      </Flex>
      <Flex
        flexDir="column"
        {...ticketCardStyle}
        {...(ticketType === '7 days' && ticketCardSelect)}
        onClick={() => setTicketType('7 days')}
      >
        <Heading>{ticketType7days.ticketType}</Heading>
        <Text>{ticketType7days.nowPrice},-</Text>
        <Text>NORMALPRIS {ticketType7days.normalPrice},-</Text>
      </Flex>
      <Flex
        flexDir="column"
        {...ticketCardStyle}
        {...(ticketType === '30 days' && ticketCardSelect)}
        onClick={() => setTicketType('30 days')}
      >
        <Heading>{ticketType30days.ticketType}</Heading>
        <Text>{ticketType30days.nowPrice},-</Text>
        <Text>NORMALPRIS {ticketType30days.normalPrice},-</Text>
      </Flex>
    </Flex>
  )
}

export default StepTypeTicket
