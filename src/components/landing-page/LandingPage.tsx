import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import { useContext, useEffect, useReducer } from 'react'
import { useAuth } from '../../context/AuthContext'
import UserContext, { UserProvider } from '../../context/dashboard/dashboard_context'
import { initialState, UserActionType, userReducer } from '../../context/dashboard/dashboard_reducer'
import { UserDetails } from '../../pages'
import AlertBox from '../alert/Alert'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { EditProfile } from '../profile/EditProfile'
import { ProfileBanner } from '../profile/ProfileBanner'


function LandingPage({ data }: UserDetails) {
  console.log("TESTTETS", data)

  const { user, logout, isLoading, authAlertActive, authAlert } = useAuth()
  // console.log('from state', user?.access_token)

  // const { getUser } = useContext(UserContext);


  return (
    <>

      {authAlertActive && <AlertBox status={authAlert} />}
      <ProfileBanner data={data} />
      <Flex pb={10} flexDir='column'></Flex>
      <Footer />
    </>
  )
}

export default LandingPage
