import { Box, Button, Flex, flexbox, Text, Wrap } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { FC } from 'react'
import StepConfirm from './stepConfirm'
import StepDates from './stepDates'
import StepEnd from './stepEnd'

const content = (
  <Flex py={4}>
    <Text>Hej</Text>
  </Flex>
)

/* type Props = {
  activeStep: number
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  reset: () => void
  initialStep: number
} */

const steps = [
  { label: 'Vælg datoer', content },
  { label: 'Bekræft', content },
  { label: 'Fedt!', content },
]

const StepFlow = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  return (
    <Flex flexDir='column' width='100%'>
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {/*     <Box maxW={'none'}>
        <Flex width={'auto'} overflow='scroll'>
          <StepDates />
          <StepConfirm />
          <StepEnd />
        </Flex>
      </Box> */}

      <Wrap minHeight={80}>{activeStep === 0 ? <StepDates /> : activeStep === 1 ? <StepConfirm /> : <StepEnd />}</Wrap>

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
          <Button size='sm' onClick={nextStep}>
            {activeStep === steps.length - 1 ? 'Bekræft datoer' : 'Next'}
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default StepFlow
