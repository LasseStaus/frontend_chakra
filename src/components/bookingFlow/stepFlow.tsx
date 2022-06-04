import { Button, Flex, useToast } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React, { useState } from 'react'
import { DateObject } from 'react-multi-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { createBooking } from '../../redux/userActions'
import { selectUser, updateSelectedBookings } from '../../redux/userSlice'
import { FormatDatesforState } from '../helpers/formatDatesForState'
import StepConfirm from './stepConfirm'
import StepDates from './stepDates'
import StepEnd from './stepEnd'

const steps = [
  { label: 'Choose Dates', key: 0 },
  { label: 'Confirm Dates', key: 1 },
  { label: 'Booking Confirmation', key: 2 }
]

const StepFlow = () => {
  const dispatch: AppDispatch = useDispatch()

  const errorToast = useToast({
    position: 'bottom-right',
    status: 'error',
    title: 'Whoops',
    isClosable: true,
    duration: 5000,
    variant: 'solid'
  })
  // "subtle" | "solid" | "left-accent" | "top-accent" |
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  })

  const [calenderDates, setCalendarDates] = useState<DateObject | DateObject[] | null>(null)
  console.log(calenderDates)
  const userState = useSelector(selectUser)

  function handleNext() {
    console.log('Tickets', userState.tickets.activeTickets, 'step', activeStep)

    if (activeStep === 0) {
      if (userState.tickets.activeTickets && userState.tickets.activeTickets > 0) {
        const formattedDates = FormatDatesforState(calenderDates)
        dispatch(updateSelectedBookings(formattedDates))
        return nextStep()
      } else {
        return errorToast({ description: "You don't have enough tickets" })
      }
    }
    if (activeStep === 1) {
      dispatch(createBooking(userState.selectedBookings))
      nextStep()
      setStep(3)
    }
  }
  return (
    <Flex flexDir="column" width="100%">
      <Steps color={'red'} activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label}></Step>
        ))}
      </Steps>

      <Flex justify="center" align="center" minHeight={80} w="full">
        {activeStep === 0 ? (
          <StepDates calenderDates={calenderDates} setCalendarDates={setCalendarDates} />
        ) : activeStep === 1 ? (
          <StepConfirm />
        ) : (
          <StepEnd />
        )}
      </Flex>
      {activeStep === steps.length ? null : (
        <Flex width="100%" justify="flex-end">
          <Button isDisabled={activeStep === 0 || activeStep === 2} mr={4} onClick={prevStep} size="sm" variant="ghost">
            Tilbage
          </Button>

          <Button onClick={handleNext} size="sm" disabled={calenderDates == null || Object.keys(calenderDates).length == 0 ? true : false}>
            {activeStep === 0 ? 'Next' : 'Confirm booking dates'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlow
