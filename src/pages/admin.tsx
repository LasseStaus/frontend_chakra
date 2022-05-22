import { Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminDasboard from '../components/adminPage/AdminDashboard'
import Layout from '../components/layouts/layout/Layout'
import { store } from '../redux/store'

type AppDispatch = typeof store.dispatch
const AdminPage = () => {
  const isAdmin = useSelector((state: any) => state.authentication.isAdmin)
  const authenticated = useSelector((state: any) => state.authentication.authenticated)
  const authenticationLoad = useSelector((state: any) => state.authentication.authenticationLoad)

  const pending = useSelector((state: any) => state.authentication.pending)
  const user = useSelector((state: any) => state.user.firstname)
  const dispatch: AppDispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
  }, [isAdmin])

  return (
    <Skeleton isLoaded={!pending && !authenticationLoad && isAdmin}>
      <Layout pageTitle="hej">
        <AdminDasboard />
      </Layout>
    </Skeleton>
  )
}

export default AdminPage
