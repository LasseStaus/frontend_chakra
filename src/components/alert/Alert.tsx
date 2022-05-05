import { Alert, AlertIcon, Stack } from '@chakra-ui/react'

const AlertBox = ({ status }: any) => {
  let text = 'lol'

  if (status === 'success') {
    text = 'Success! Your account has been created'
  }
  if (status === 'error') {
    text = 'Something went wrong, try again or FIND ANOTHER PLACE TO DO YOUR WOOD WORK'
  }
  if (status === 'error') {
    text = 'nedtur'
  }
  if (status === 'error') {
    text = 'nedtur'
  }

  return (
    <Alert status={status}>
      <AlertIcon />
      {text}
    </Alert>
  )
}

export default AlertBox
