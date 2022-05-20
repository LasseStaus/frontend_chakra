import { Skeleton, Box } from '@chakra-ui/react'
import AdminDasboard from '../components/adminPage/AdminDashboard'
import Loginform from '../components/forms/Loginform'
import LandingPage from '../components/landing-page/LandingPage'
import Layout from '../components/layouts/layout/Layout'
import { store } from '../redux/store'

type AppDispatch = typeof store.dispatch
const AdminPage = () => {
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
      <Layout pageTitle="Home">{adminAuthenticated ? <AdminDasboard /> : <Loginform />}</Layout>
      {/* </Skeleton> */}
    </Box>
  )
}

export default AdminPage
