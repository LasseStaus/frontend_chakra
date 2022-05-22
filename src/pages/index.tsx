import { Skeleton } from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { authenticateOnLoad } from '../redux/authenticationActions'
import { authenticationSliceState } from '../redux/authenticationSlice'
import { store } from '../redux/store'

type AppDispatch = typeof store.dispatch
const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authenticated = useSelector((state: any) => state.authentication.authenticated)
  const authenticationLoad = useSelector((state: any) => state.authentication.authenticationLoad)
  const isAdmin: boolean = useSelector((state: any) => state.authentication.isAdmin)
  const router = useRouter()

  useEffect(() => {
    dispatch(authenticateOnLoad())
    if (isAdmin) {
      router.push('/admin')
    }
  }, [isAdmin])

  return (
    <Skeleton startColor="white" endColor="white" isLoaded={!authenticationLoad}>
      {authenticated && !isAdmin ? (
        <Layout pageTitle="Home">
          <LandingPage />
        </Layout>
      ) : (
        !authenticated && (
          <Layout pageTitle="Welcome to CPH workspace">
            <AuthenticatedPage />
          </Layout>
        )
      )}
    </Skeleton>
  )
}

export default Dashboard
