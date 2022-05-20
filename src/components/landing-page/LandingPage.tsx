import { Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { getUserInfo } from "../../redux/userActions"
import { setAlertMessage } from "../../redux/userSlice"
import AlertBox from "../alert/Alert"
import Calender from "../calendar/calendarContainer"
import UpcommingBookings from "../calendar/upcommingBookings/UpcommingBookingsContainer"
import Footer from "../footer/Footer"
import { ProfileBanner } from "../profile/ProfileBanner"
import Ticket from "../tickets/TicketContainer"

function LandingPage() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const alertMessage = useSelector((state: any) => state.user.alertMessage)
  const alertType = useSelector((state: any) => state.user.alertType)
  console.log(alertMessage)

  // TO DO, maybe another solution to this?
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

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
      <ProfileBanner />
      <Flex pb={10} flexDir="column"></Flex>
      <Calender />
      <Flex pb={10} flexDir="column"></Flex>
      <UpcommingBookings />
      <Flex pb={10} flexDir="column"></Flex>
      <Ticket />
      <Footer />
    </>
  )
}

export default LandingPage
