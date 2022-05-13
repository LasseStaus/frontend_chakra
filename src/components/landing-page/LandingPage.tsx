import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import { useAuth } from '../../context/AuthContext'
// import DashboardContext, { useLoggedInUser } from '../../context/dashboard/dashboard_context'
import UserContext from '../../context/dashboard/dashboard_context'
import { initialState } from '../../context/dashboard/dashboard_reducer'
import { UserDetails } from '../../pages'
import AlertBox from '../alert/Alert'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import { EditProfile } from '../profile/EditProfile'
import { ProfileBanner } from '../profile/ProfileBanner'


function LandingPage() {

  const { user, logout, isLoading, authAlertActive, authAlert } = useAuth()

  // const { loggedInUser, getUserData } = useContext(DashboardContext);

  // useEffect(() => {
  //   getUserData(data);
  // }, [])

  // const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  // useEffect(() => {
  //   setLoggedInUser(data);
  // }, [data]);


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
