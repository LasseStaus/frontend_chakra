import { Box, Button, Flex, flexbox, Text, Wrap } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useRef } from 'react'
import { FC, useEffect, useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import StepConfirm from './stepConfirm'
import StepDates from './stepTypeTicket'
import StepEnd from './stepEnd'
import StepTypeTicket from './stepTypeTicket'

const steps = [
  { label: 'Choose ticket card' },
  { label: 'Summary' },
  { label: 'Payment' },
]

const StepFlowTicket = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const [selectedDates, setSelectedDates] = useState<[] | string[]>([])
  const [ticketType, setTicketType] = React.useState<"3 days" | "7 days" | "30 days">("3 days");

  useEffect(() => {
    console.log('in stepflow', selectedDates)

    setTimeout(() => {
      // setSelectedDates(selectedDates)
      console.log('timeout', selectedDates)
    }, 3000)
  }, [selectedDates])

  function handleNext() {
    console.log('handleNext', selectedDates)
    console.log('done in handle', selectedDates)

    nextStep()

    //  createBooking(selectedDates)
  }

  return (
    <Flex flexDir='column' width='100%'>
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label}>
          </Step>
        ))}
      </Steps>

      <Wrap minHeight={80}>{activeStep === 0 ? <StepTypeTicket ticketType={ticketType} setTicketType={setTicketType} /> : activeStep === 1 ? <StepConfirm ticketType={ticketType} /> : <StepEnd />}</Wrap>
      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx='auto' size='sm' onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width='100%' justify='flex-end'>
          <Button isDisabled={activeStep === 0} mr={4} onClick={prevStep} size='sm' variant='ghost'>
            Tilbage
          </Button>
          <Button size='sm' onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Bekræft datoer' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlowTicket
