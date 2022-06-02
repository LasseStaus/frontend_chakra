import { useSelector } from 'react-redux'
import { selectAuthentication } from '../../redux/authenticationSlice'
import AlertBox from '../alert/Alert'
import AdminBookingPanel from './AdminBookingPanel'

function AdminDasboard() {
  const authState = useSelector(selectAuthentication)

  return (
    <>
      {authState.alertMessage != undefined ? <AlertBox alertMessage={authState.alertMessage} alertType={authState.alertType} /> : null}
      <AdminBookingPanel />
    </>
  )
}

export default AdminDasboard
