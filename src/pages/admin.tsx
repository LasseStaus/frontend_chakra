import { Skeleton, Box, Center, Container, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminDasboard from '../components/adminPage/AdminDashboard'
import Loginform from '../components/forms/Loginform'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { store } from '../redux/store'
import { authenticateOnLoad } from '../redux/authenticationActions'

type AppDispatch = typeof store.dispatch

const AdminLogin = () => {
  return (
    <Container bg="white" centerContent mt="10">
      <Heading fontSize="xl">Admin Login</Heading>
      <Loginform />
    </Container>
  )
}
const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(authenticateOnLoad())
  }, [])
  //   const dispatch = useDispatch<AppDispatch>()
  //   const authenticated = useSelector((state: any) => state.authentication.authenticated)
  //   const authenticationLoad = useSelector((state: any) => state.authentication.authenticationLoad)
  //   useEffect(() => {
  //     dispatch(authenticateOnLoad())
  //   }, [])

  const adminAuthenticated = true
  return (
    <Box>
      {/* <Skeleton startColor="white" endColor="white" isLoaded={!authenticationLoad}> */}
      <Layout pageTitle="Home">{adminAuthenticated ? <AdminDasboard /> : <AdminLogin />}</Layout>
      {/* </Skeleton> */}
    </Box>
  )
}

export default AdminPage
