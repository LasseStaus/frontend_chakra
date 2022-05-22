import { useSelector } from 'react-redux'
import AlertBox from '../alert/Alert'
import AdminBookingPanel from './AdminBookingPanel'

function AdminDasboard() {
  const alertMessage = useSelector((state: any) => state.user.alertMessage)
  const alertType = useSelector((state: any) => state.user.alertType)

  return (
    <>
      {alertMessage != undefined ? <AlertBox alertMessage={alertMessage} alertType={alertType} /> : null}
      <AdminBookingPanel />
    </>
  )
}

export default AdminDasboard
