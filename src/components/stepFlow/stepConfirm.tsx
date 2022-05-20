import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import ListItem from '../generic/listItem'

type Props = {
  selectedDates: Array<string> | null | Array<object>
}
const StepConfirm = ({ selectedDates }: any) => {
  console.log('type', typeof selectedDates)

  console.log('confirm', selectedDates)

  let lolArray = new Array()
  formatDates(selectedDates)
  function formatDates(selectedDates: any) {
    selectedDates.forEach((date: string) => {
      const currentDate = new Date(date)

      // const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }

      const formattedDate = currentDate.toLocaleDateString('da-DA', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })

      lolArray.push(formattedDate)
    })
  }

  return (
    <Flex flexDir={'column'} w={'100%'} h={'100%'}>
      CNNFIRM PURCHASE
      <Heading>
        Du har valgt {selectedDates.length} {selectedDates.length === 1 ? 'dato' : 'datoer'}
      </Heading>
      {lolArray.map((date: string) => (
        <ListItem key={date} element={date} />
      ))}
    </Flex>
  )
}

export default StepConfirm
