import { Skeleton } from '@chakra-ui/react'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'

const Dashboard = () => {
  return (
    <>
      {/*    <Skeleton startColor="white" endColor="white" isLoaded={!isLoading}>
        <Layout pageTitle="Home">{user ? <LandingPage /> : <AuthenticatedPage />}</Layout>
      </Skeleton> */}
    </>
  )
}

export default Dashboard
