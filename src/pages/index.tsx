import { Skeleton } from '@chakra-ui/react'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user, isLoading } = useAuth()
  return (
    <>
      <Skeleton startColor="white" endColor="white" isLoaded={!isLoading}>
        <Layout pageTitle="Home">{user ? <LandingPage /> : <AuthenticatedPage />}</Layout>
      </Skeleton>
    </>
  )
}

export default Dashboard
