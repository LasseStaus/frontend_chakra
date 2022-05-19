import { Skeleton } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AuthenticatedPage from "../components/authenticationPage/AuthenticationPage"
import LandingPage from "../components/landing-page/LandingPage"
import Layout from "../components/layouts/layout/Layout"
import { AuthContext } from "../context/AuthContext"
import { authenticateOnLoad } from "../redux/authenticationSlice"
import { AppDispatch } from "../redux/store"
// import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authenticated = useSelector((state: any) => state.user.authenticated)
  const authenticationLoad = useSelector((state: any) => state.user.authenticationLoad)
  useEffect(() => {
    dispatch(authenticateOnLoad())
  }, [])

  return (
    <Skeleton startColor="white" endColor="white" isLoaded={!authenticationLoad}>
      <Layout pageTitle="Home">{authenticated ? <LandingPage /> : <AuthenticatedPage />}</Layout>
    </Skeleton>
  )
}

export default Dashboard
