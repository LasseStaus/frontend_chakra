import { Skeleton, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefreshToken } from '../../redux/authenticationActions'
import { selectAuthentication } from '../../redux/authenticationSlice'
import { AppDispatch } from '../../redux/store'
import { getTicketTypes, getUserInfo } from '../../redux/userActions'
import { selectUser } from '../../redux/userSlice'
import AlertBox from '../alert/Alert'
import CalendarModal from '../calendar/calendarModal'
import CurrentCalendar from '../calendar/currentCalendar'
import IsWindowSizeLargerThan from '../hooks/getWindowSize'
import { ProfileBanner } from '../profile/ProfileBanner'
import Ticket from '../tickets/TicketContainer'
import TicketModal from '../tickets/TicketModal'
import UpcommingBookings from '../upcommingBookings/UpcommingBookingsContainer'

function LandingPage() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const { isOpen: isOpenTicket, onOpen: onOpenTicket, onClose: onCloseTicket } = useDisclosure()
  const { isOpen: isBookingOpen, onOpen: onBookingOpen, onClose: onBookingClose } = useDisclosure()

  const authState = useSelector(selectAuthentication)
  const userState = useSelector(selectUser)

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateRefreshToken())
      //set to 15000 for testing, otherwise it might bug
    }, 600000)
  }, [])

  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getTicketTypes())
  }, [dispatch])
  const windowSize = IsWindowSizeLargerThan(700)

  return (
    <>
      <Skeleton startColor="white" endColor="white" isLoaded={userState.user.firstname != ''}>
        {userState.alertMessage != undefined && <AlertBox alertMessage={userState.alertMessage} alertType={userState.alertType} />}
        <ProfileBanner onOpenTicket={onOpenTicket} onBookingOpen={onBookingOpen} />
        <CurrentCalendar numberOfMonths={windowSize ? 2 : 1} />
        <UpcommingBookings onBookingOpen={onBookingOpen} />
        <Ticket onOpenTicket={onOpenTicket} />
        <TicketModal isOpen={isOpenTicket} onClose={onCloseTicket} />
        <CalendarModal isOpen={isBookingOpen} onClose={onBookingClose} />
      </Skeleton>
    </>
  )
}

export default LandingPage
