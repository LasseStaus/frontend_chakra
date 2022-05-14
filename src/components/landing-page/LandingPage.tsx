import { Flex } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'

import AlertBox from '../alert/Alert'
import Calender from '../calendar/calendarContainer'
import Footer from '../footer/Footer'
import { ProfileBanner } from '../profile/ProfileBanner'

function LandingPage() {
  const { alertActive } = useAuth()

  return (
    <>
      {alertActive && <AlertBox />}
      <ProfileBanner />
      <Flex pb={10} flexDir='column'></Flex>
      <Calender />
      <Footer />
    </>
  )
}

export default LandingPage
