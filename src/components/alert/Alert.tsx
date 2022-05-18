import { Alert, AlertIcon, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export const AlertBox = () => {
  const { alertActive, setAlertActive, authAlert, alertText } = useAuth()
  const status = authAlert
  const text = alertText

  useEffect(() => {
    if (alertActive) {
      const timeId = setTimeout(() => {
        setAlertActive(false)
      }, 7000)

      return () => {
        clearTimeout(timeId)
      }
    }
  }, [])

  return (
    <Alert status={status}>
      <AlertIcon />
      {text}
    </Alert>
  )
}

export default AlertBox
