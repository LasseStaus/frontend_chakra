import { Box, Button, Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthProvider } from "../../context/AuthContext"
import { AppDispatch } from "../../redux/store"
import { getUserInfo } from "../../redux/userSlice"

import AlertBox from "../alert/Alert"
import Calender from "../calendar/calendarContainer"
import UpcommingBookings from "../calendar/upcommingBookings/UpcommingBookingsContainer"
import Footer from "../footer/Footer"
import { ProfileBanner } from "../profile/ProfileBanner"
import Ticket from "../tickets/TicketContainer"

function LandingPage() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const token = useSelector((state: any) => state.authentication.tokens)

  const userData = useSelector((state: any) => state.user.user)
  const bookingData = useSelector((state: any) => state.user.bookings)
  const ticketData = useSelector((state: any) => state.user.tickets)
  const purchaseData = useSelector((state: any) => state.user.purchases)
  console.log("user", userData, "bookingdata", bookingData, "tickets", ticketData, "purchaseData", purchaseData)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  return (
    <>
      {/* {alertActive && <AlertBox />} */}
      {token && <Box>{token}</Box>}
      <br></br>
      <Button onClick={(e) => dispatch(getUserInfo())}></Button>
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
