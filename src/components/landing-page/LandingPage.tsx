import { Flex } from '@chakra-ui/react'
import { useContext } from 'react'
import { useAuth } from '../../context/AuthContext'

import AlertBox from '../alert/Alert'
import Footer from '../footer/Footer'
import { ProfileBanner } from '../profile/ProfileBanner'

function LandingPage() {
  const { user, logout, isLoading, authAlertActive, authAlert } = useAuth()

  return (
    <>
      {authAlertActive && <AlertBox status={authAlert} />}
      <ProfileBanner />
      <Flex pb={10} flexDir='column'></Flex>
      <Footer />
    </>
  )
}

export default LandingPage
