import { Alert, AlertIcon } from '@chakra-ui/react'

type Props = {
  alertMessage: string | undefined
  alertType?: 'success' | 'error' | 'warning' | 'info'
}

export const AlertBox = ({ alertMessage, alertType }: Props) => {
  return (
    <Alert position={'absolute'} zIndex={'200'} status={alertType}>
      <AlertIcon />
      {alertMessage}
    </Alert>
  )
}

export default AlertBox
