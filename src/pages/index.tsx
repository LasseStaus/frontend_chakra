import { Skeleton } from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { authenticateOnLoad } from '../redux/authenticationActions'
import { authenticationSliceState, selectAuthentication } from '../redux/authenticationSlice'
import { store } from '../redux/store'

type AppDispatch = typeof store.dispatch
const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const authState = useSelector(selectAuthentication)

  useEffect(() => {
    dispatch(authenticateOnLoad())
    if (authState.isAdmin) {
      router.push('/admin')
    }
  }, [dispatch, authState.isAdmin, router])

  return (
    <Skeleton startColor="white" endColor="white" isLoaded={!authState.authenticationLoad}>
      {authState.authenticated && !authState.isAdmin ? (
        <Layout pageTitle="Home">
          <LandingPage />
        </Layout>
      ) : (
        !authState.authenticated && (
          <Layout pageTitle="Welcome to CPH workspace">
            <AuthenticatedPage />
          </Layout>
        )
      )}
    </Skeleton>
  )
}

export default Dashboard
