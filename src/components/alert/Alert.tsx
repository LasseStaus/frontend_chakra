import { Alert, AlertIcon } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { selectUser, setAlertMessage } from '../../redux/userSlice'
import { selectAuthentication, setAlertMessage as setAuthAlertMessage } from '../../redux/authenticationSlice'

type Props = {
  alertMessage: string | undefined
  alertType?: 'success' | 'error' | 'warning' | 'info'
}

export const AlertBox = ({ alertMessage, alertType }: Props) => {
  const userState = useSelector(selectUser)
  const authState = useSelector(selectAuthentication)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    console.log('1', userState.alertMessage, '2', authState.alertMessage)

    if (userState.alertMessage != undefined || authState.alertMessage != undefined) {
      const timeId = setTimeout(() => {
        dispatch(setAlertMessage(undefined))
        dispatch(setAuthAlertMessage(undefined))
      }, 3000)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [userState.alertMessage, authState.alertMessage])

  return (
    <Alert position={'absolute'} zIndex={'200'} status={alertType}>
      <AlertIcon />
      {alertMessage}
    </Alert>
  )
}

export default AlertBox
