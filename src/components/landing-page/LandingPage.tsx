import { Box, Flex } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'
import AllBookings from '../admin/adminPanel'

import AlertBox from '../alert/Alert'
import Calender from '../calendar/calendarContainer'
import UpcommingBookings from '../calendar/upcommingBookings/UpcommingBookingsContainer'
import Footer from '../footer/Footer'
import { ProfileBanner } from '../profile/ProfileBanner'
import Ticket from '../tickets/TicketContainer'

function LandingPage() {
  const { alertActive } = useAuth()

  return (
    <>
      {alertActive && <AlertBox />}
      <ProfileBanner />
      <Flex pb={10} flexDir='column'></Flex>
      <AllBookings />
      <Calender />
      <Flex pb={10} flexDir='column'></Flex>
      <UpcommingBookings />
      <Flex pb={10} flexDir='column'></Flex>
      <Ticket />
      <Footer />
    </>
  )
}

export default LandingPage
