import { Button, Flex } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { purchaseTicket } from '../../../redux/userActions'
import StepConfirmTicket from './stepConfirm'
import StepPaymentTicket from './stepPayment'
import StepTypeTicket from './stepTypeTicket'

const steps = [{ label: 'Choose ticket card' }, { label: 'Payment' }, { label: 'Confirmation' }]

const StepFlowTicket = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  })
  const [typeOfTicket, setTicketType] = React.useState<string>('3 days')
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  function handlePayment() {
    dispatch(purchaseTicket(typeOfTicket)).then(() => {
      setStep(3)
    })
  }

  return (
    <Flex flexDir="column" w="full">
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label}></Step>
        ))}
      </Steps>

      <Flex justify="center" align="center" minHeight={80} w="full">
        {activeStep === 0 ? (
          <StepTypeTicket typeOfTicket={typeOfTicket} setTicketType={setTicketType} />
        ) : activeStep === 1 ? (
          <StepPaymentTicket typeOfTicket={typeOfTicket} />
        ) : (
          <StepConfirmTicket typeOfTicket={typeOfTicket} />
        )}
      </Flex>
      {activeStep === steps.length ? null : (
        <Flex width="100%" justify="flex-end">
          <Button isDisabled={activeStep === 0 || activeStep === 2} mr={4} onClick={prevStep} size="sm" variant="ghost">
            Tilbage
          </Button>
          {activeStep === 0 ? (
            <Button size="sm" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button size="sm" onClick={() => handlePayment()}>
              Confirm payment
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlowTicket
