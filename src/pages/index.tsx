import { Skeleton } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { authenticateOnLoad } from '../redux/authenticationActions'
import { store } from '../redux/store'

type AppDispatch = typeof store.dispatch
const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authenticated = useSelector((state: any) => state.authentication.authenticated)
  const authenticationLoad = useSelector((state: any) => state.authentication.authenticationLoad)
  useEffect(() => {
    dispatch(authenticateOnLoad())
  }, [])
  return (
    <Skeleton startColor="white" endColor="white" isLoaded={!authenticationLoad}>
      <Layout pageTitle="Home">{authenticated ? <LandingPage /> : <AuthenticatedPage />}</Layout>
    </Skeleton>
  )
}
