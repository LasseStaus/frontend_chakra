import { Flex } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'

import AlertBox from '../alert/Alert'
import Footer from '../footer/Footer'
import { ProfileBanner } from '../profile/ProfileBanner'

function LandingPage() {
  const { alertActive } = useAuth()

  return (
    <>
      {alertActive && <AlertBox />}
      <ProfileBanner />
      <Flex pb={10} flexDir='column'></Flex>
      <Footer />
    </>
  )
}

export default LandingPage
