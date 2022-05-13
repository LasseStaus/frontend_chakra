import { Alert, AlertIcon, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const AlertBox = () => {

  const { authAlertActive, setauthAlertActive, authAlert, authAlertText } = useAuth()
  const status = authAlert
  const text = authAlertText

  useEffect(() => {

    if (authAlertActive) {
      const timeId = setTimeout(() => {
        setauthAlertActive(false)
      }, 7000)

      return () => {
        clearTimeout(timeId)
      }
    }
  }, [])


  // if (status === 'success') {
  //   text = 'Success! Your account has been created'
  // }
  // if (status === 'error') {
  //   text = 'Something went wrong, try again or FIND ANOTHER PLACE TO DO YOUR WOOD WORK'
  // }
  // if (status === 'error') {
  //   text = 'nedtur'
  // }
  // if (status === 'error') {
  //   text = 'nedtur'
  // }

  return (
    <Alert status={status}>
      <AlertIcon />
      {text}
    </Alert>
  )
}

export default AlertBox
