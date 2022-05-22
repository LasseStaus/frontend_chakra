import { Button, Flex, Wrap } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import React from 'react'
import StepConfirmTicket from './stepConfirm'
import StepPaymentTicket from './stepPayment'
import StepTypeTicket from './stepTypeTicket'

const steps = [{ label: 'Choose ticket card' }, { label: 'Payment' }, { label: 'Confirmation' }]

const StepFlowTicket = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0
  })
  const [ticketType, setTicketType] = React.useState<'3 days' | '7 days' | '30 days'>('3 days')

  return (
    <Flex flexDir="column" width="100%">
      <Steps activeStep={activeStep}>
        {steps.map(({ label }) => (
          <Step label={label} key={label}></Step>
        ))}
      </Steps>

      <Wrap minHeight={80}>
        {activeStep === 0 ? (
          <StepTypeTicket ticketType={ticketType} setTicketType={setTicketType} />
        ) : activeStep === 1 ? (
          <StepPaymentTicket ticketType={ticketType} />
        ) : (
          <StepConfirmTicket ticketType={ticketType} />
        )}
      </Wrap>
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
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Bekræft datoer' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlowTicket
