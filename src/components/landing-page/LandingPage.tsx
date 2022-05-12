import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'
import AlertBox from '../alert/Alert'
import Calender from '../calendar/calendarContainer'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { ProfileBanner } from '../profile/ProfileBanner'

function LandingPage() {
  const { user, login, logout, isLoading, authAlertActive, authAlert } = useAuth()
  console.log('from state', user?.access_token)

  return (
    <>
      {authAlertActive && <AlertBox status={authAlert} />}
      <Header />
      <ProfileBanner />
      <Flex pb={10} flexDir='column'></Flex>
      <Calender />
      <Footer />
    </>
  )
}

export default LandingPage
