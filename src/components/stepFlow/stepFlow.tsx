import { Box, Button, Flex, flexbox, Text, Wrap } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useRef } from 'react'
import { FC, useEffect, useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import { useBooking } from '../../context/bookingContext'
import StepConfirm from './stepConfirm'
import StepDates from './stepDates'
import StepEnd from './stepEnd'

const content = (
  <Flex py={4}>
    <Text>Hej</Text>
  </Flex>
)

const steps = [
  { label: 'Vælg datoer', content },
  { label: 'Bekræft', content },
  { label: 'Fedt!', content },
]

const StepFlow = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const [selectedDates, setSelectedDates] = useState<[] | string[]>([])

  useEffect(() => {
    console.log('in stepflow', selectedDates)

    setTimeout(() => {
      // setSelectedDates(selectedDates)
      console.log('timeout', selectedDates)
    }, 3000)
  }, [selectedDates])

  const { createBooking } = useBooking()
  const childFunc = useRef()

  function handleNext() {
    console.log('handleNext', selectedDates)
    console.log('done in handle', selectedDates)

    nextStep()

    //  createBooking(selectedDates)
  }

  return (
    <Flex flexDir='column' width='100%'>
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>

      <Wrap minHeight={80}>{activeStep === 0 ? <StepDates selectedDates={selectedDates} setSelectedDates={setSelectedDates} /> : activeStep === 1 ? <StepConfirm /> : <StepEnd />}</Wrap>
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

export default StepFlow
