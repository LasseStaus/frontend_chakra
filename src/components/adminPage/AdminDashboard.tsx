import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getTicketTypes, getUserInfo } from '../../redux/userActions'
import { setAlertMessage } from '../../redux/userSlice'
import AllBookings from '../admin/adminPanel'
import AlertBox from '../alert/Alert'
import Footer from '../footer/Footer'

function AdminDasboard() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const alertMessage = useSelector((state: any) => state.user.alertMessage)
  const alertType = useSelector((state: any) => state.user.alertType)
  console.log(alertMessage)

  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getTicketTypes())
  }, [])

  // TO DO, maybe another solution to this?
  useEffect(() => {
    if (alertMessage != undefined) {
      const timeId = setTimeout(() => {
        dispatch(setAlertMessage(undefined))
      }, 7000)

      return () => {
        clearTimeout(timeId)
      }
    }
  }, [alertMessage, dispatch])

  return (
    <>
      {alertMessage != undefined ? <AlertBox alertMessage={alertMessage} alertType={alertType} /> : null}
      <AllBookings />
      <Footer />
    </>
  )
}

export default AdminDasboard
