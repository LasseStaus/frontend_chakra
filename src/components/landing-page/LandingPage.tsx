import { useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import refreshTokens from '../../pages/api/authenticateOnLoad'
import { updateRefreshToken } from '../../redux/authenticationActions'
import { AppDispatch } from '../../redux/store'
import { getTicketTypes, getUserInfo } from '../../redux/userActions'
import { setAlertMessage } from '../../redux/userSlice'
import AlertBox from '../alert/Alert'
import CalendarModal from '../calendar/calendarModal'
import CurrentCalendar from '../calendar/currentCalendar'
import { ProfileBanner } from '../profile/ProfileBanner'
import Ticket from '../tickets/TicketContainer'
import TicketModal from '../tickets/TicketModal'
import UpcommingBookings from '../upcommingBookings/UpcommingBookingsContainer'

function LandingPage() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const { isOpen: isOpenTicket, onOpen: onOpenTicket, onClose: onCloseTicket } = useDisclosure()
  const { isOpen: isBookingOpen, onOpen: onBookingOpen, onClose: onBookingClose } = useDisclosure()

  const userRefreshToken = useSelector((state: any) => state.authentication.tokens)

  const alertMessage = useSelector((state: any) => state.user.alertMessage)
  const alertType = useSelector((state: any) => state.user.alertType)

  if (userRefreshToken) {
    console.log(userRefreshToken)

    setTimeout(() => {
      dispatch(updateRefreshToken())
      //set to 15000 for testing, otherwise it might bug
    }, 600000)
  }

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
      <ProfileBanner onOpenTicket={onOpenTicket} onBookingOpen={onBookingOpen} />
      <CurrentCalendar />
      <UpcommingBookings onBookingOpen={onBookingOpen} />
      <Ticket onOpenTicket={onOpenTicket} />
      <TicketModal isOpen={isOpenTicket} onClose={onCloseTicket} />
      <CalendarModal isOpen={isBookingOpen} onClose={onBookingClose} />
    </>
  )
}

export default LandingPage
