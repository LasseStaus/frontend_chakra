import { Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminDasboard from '../components/admin/AdminDashboard'
import AlertBox from '../components/alert/Alert'
import Layout from '../components/layouts/layout/Layout'
import { selectAuthentication } from '../redux/authenticationSlice'
import { AppDispatch } from '../redux/store'
import { getUserInfo } from '../redux/userActions'
import { selectUser } from '../redux/userSlice'

const AdminPage = () => {
  const userState = useSelector(selectUser)
  const authState = useSelector(selectAuthentication)

  const router = useRouter()

  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!authState.isAdmin) {
      router.push('/')
    }
    if (authState.isAdmin) {
      dispatch(getUserInfo())
    }
  }, [dispatch, authState.isAdmin, router])

  return (
    <Skeleton isLoaded={!authState.pending && !authState.authenticationLoad && authState.isAdmin}>
      <Layout pageTitle={`Admin ${userState.user?.firstname ? userState.user.lastname : ''}`}>
        {userState.alertMessage != undefined && <AlertBox alertMessage={userState.alertMessage} alertType={userState.alertType} />}

        <AdminDasboard />
      </Layout>
    </Skeleton>
  )
}

export default AdminPage
