import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'
import { ProfileBanner } from '../profile/ProfileBanner'

function LandingPage() {
  const { user, login, logout, emailError, passwordError, isLoading } = useAuth()
  console.log('from state', user?.access_token)
  return (
    <>
      <ProfileBanner />
      <Flex pb={10} flexDir='column'>

      </Flex>
    </>
  )
}

export default LandingPage
