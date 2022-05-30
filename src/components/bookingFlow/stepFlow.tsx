import { Box, Button, Container, Flex } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { createBooking } from '../../redux/userActions'
import { updateSelectedBookings } from '../../redux/userSlice'
import { FormatDatesforState } from '../helpers/formatDatesForState'
import StepConfirm from './stepConfirm'
import StepDates from './stepDates'
import StepEnd from './stepEnd'

const steps = [
  { label: 'Choose Dates', key: 0 },
  { label: 'Confirm Dates', key: 1 },
  { label: 'Receipt', key: 2 }
]

const StepFlow = () => {
  const dispatch: AppDispatch = useDispatch<any>()

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  })

  const [calenderDates, setCalendarDates] = useState<DateObject | DateObject[] | null>(null)

  const bookingsState = useSelector((state: any) => state.user.selectedBookings)

  function handleNext() {
    if (activeStep === 0) {
      const formattedDates = FormatDatesforState(calenderDates)
      dispatch(updateSelectedBookings(formattedDates))
      return nextStep()
    }
    if (activeStep === 1) {
      dispatch(createBooking(bookingsState))
      nextStep()
    }
  }
  return (
    <Flex flexDir="column" width="100%">
      <Box p={6} pt={12} boxShadow={'md'}>
        <Steps color={'red'} activeStep={activeStep}>
          {steps.map(({ label }) => (
            <Step label={label} key={label}></Step>
          ))}
        </Steps>
      </Box>

      <Container maxW={'container.md'} minHeight={'60vh'} maxHeight={'60vh'}>
        {activeStep === 0 ? (
          <StepDates calenderDates={calenderDates} setCalendarDates={setCalendarDates} />
        ) : activeStep === 1 ? (
          <StepConfirm />
        ) : (
          <StepEnd />
        )}
      </Container>
      {activeStep === steps.length ? (
        <Flex p={4} mt={4}>
          <Button mx="auto" size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex mt={4} width="100%" justify="flex-end">
          <Button isDisabled={activeStep === 0 || activeStep === 2} mr={4} onClick={prevStep} size="sm" variant="ghost">
            Tilbage
          </Button>
          <Button size="sm" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Close window' : activeStep === 1 ? 'Confirm & book' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlow
