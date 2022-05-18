import { Skeleton } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { AuthContext } from '../context/AuthContext'
// import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  // const { user, isLoading } = useAuth()
  const { state, dispatch } = useContext(AuthContext);

  const { loggedInUser } = state


  return (
    <>
      {/* <Skeleton startColor='white' endColor='white' isLoaded={!isLoading}>
        <Layout pageTitle='Home'>{user ? <LandingPage /> : <AuthenticatedPage />}</Layout>
      </Skeleton> */}
      {/* <Skeleton startColor='white' endColor='white' > */}
      <Layout pageTitle='Home'>{loggedInUser ? <LandingPage /> : <AuthenticatedPage />}</Layout>
      {/* </Skeleton> */}
    </>
  )
}

export default Dashboard
