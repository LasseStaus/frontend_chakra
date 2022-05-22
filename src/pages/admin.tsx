import { Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminDasboard from '../components/admin/AdminDashboard'
import Layout from '../components/layouts/layout/Layout'
import { AppDispatch } from '../redux/store'
import { getUserInfo } from '../redux/userActions'

const AdminPage = () => {
  const isAdmin = useSelector((state: any) => state.authentication.isAdmin)
  const authenticationLoad = useSelector((state: any) => state.authentication.authenticationLoad)
  const admin = useSelector((state: any) => state.user.user.firstname)
  const pending = useSelector((state: any) => state.authentication.pending)
  const router = useRouter()

  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
    }
    if (isAdmin) {
      dispatch(getUserInfo())
    }
  }, [dispatch, isAdmin, router])

  return (
    <Skeleton isLoaded={!pending && !authenticationLoad && isAdmin}>
      <Layout pageTitle={`Admin ${admin ? admin : 'hej'}`}>
        <AdminDasboard />
      </Layout>
    </Skeleton>
  )
}

export default AdminPage
