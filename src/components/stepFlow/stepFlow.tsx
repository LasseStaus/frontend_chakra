import { Box, Button, Container, Flex, flexbox, Text, Wrap } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useRef } from 'react'
import { FC, useEffect, useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import { useBooking } from '../../context/bookingContext'
import StepConfirm from './stepConfirm'
import StepDates from './stepDates'
import StepEnd from './stepEnd'

const steps = [{ label: 'Vælg datoer' }, { label: 'Bekræft' }, { label: 'Fedt!' }]

const StepFlow = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  })

  const [selectedDates, setSelectedDates] = useState<string[] | null[]>([])
  const [calenderDates, setCalendarDates] = useState<DateObject | DateObject[] | null>(null)
  useEffect(() => {
    console.log('in stepflow', selectedDates)
    console.log('type selected dates parent', typeof selectedDates)

    setTimeout(() => {
      // setSelectedDates(selectedDates)
      console.log('timeout', selectedDates)
    }, 3000)
  }, [selectedDates])
  let selectedDatesFormatted: string[] = new Array()
  function handleDates() {
    if (calenderDates) {
      const stringify = JSON.stringify(calenderDates)
      const parse = JSON.parse(stringify)
      for (const item in parse) {
        console.log(`${item}: ${parse[item]}`, 'single date')
        const dateUnix = `${parse[item]}`
        const realDate = new Date(parseInt(dateUnix))
        const test = realDate.toISOString()

        selectedDatesFormatted.push(test)
      }
      console.log('selecntedDates handle dates', selectedDatesFormatted)
    } else if (!calenderDates) {
      return
    }

    setSelectedDates(selectedDatesFormatted)
  }
  function handleNext() {
    console.log('handleNext', selectedDates)
    console.log('done in handle', selectedDates)

    if (activeStep === 0) {
      handleDates()
      return nextStep()
    }

    nextStep()
  }

  return (
    <Flex flexDir="column" width="100%">
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label}></Step>
        ))}
      </Steps>

      <Container maxW={'container.md'} minHeight={80}>
        {activeStep === 0 ? (
          <StepDates calenderDates={calenderDates} setCalendarDates={setCalendarDates} />
        ) : activeStep === 1 ? (
          <StepConfirm selectedDates={selectedDates} />
        ) : (
          <StepEnd selectedDates={selectedDates} />
        )}
      </Container>
      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx="auto" size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button isDisabled={activeStep === 0} mr={4} onClick={prevStep} size="sm" variant="ghost">
            Tilbage
          </Button>
          <Button size="sm" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Luk vindue' : activeStep === 1 ? 'Bekræft & bestil' : 'Næste'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlow
