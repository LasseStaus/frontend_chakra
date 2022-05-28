import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getTicketTypes, getUserInfo } from '../../redux/userActions'
import { setAlertMessage } from '../../redux/userSlice'
import AlertBox from '../alert/Alert'
import CurrentCalendar from '../calendar/currentCalendar'
import { ProfileBanner } from '../profile/ProfileBanner'
import Ticket from '../tickets/TicketContainer'
import UpcommingBookings from '../upcommingBookings/UpcommingBookingsContainer'

function LandingPage() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const alertMessage = useSelector((state: any) => state.user.alertMessage)
  const alertType = useSelector((state: any) => state.user.alertType)

  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getTicketTypes())
  })

  //TODO move timers into alertmessages
  useEffect(() => {
    if (alertMessage != undefined) {
      const timeId = setTimeout(() => {
        dispatch(setAlertMessage(undefined))
      }, 7000)

      return () => {
        clearTimeout(timeId)
      }
    }
  }, [alertMessage, dispatch])

  return (
    <>
      {alertMessage != undefined ? <AlertBox alertMessage={alertMessage} alertType={alertType} /> : null}
      <ProfileBanner />
      <CurrentCalendar />
      <UpcommingBookings />
      <Ticket />
    </>
  )
}

export default LandingPage
