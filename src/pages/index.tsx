import { GetServerSideProps } from "next"
import cookie from 'cookie'
import LandingPage from "../components/landing-page/LandingPage"
import Layout from '../components/layouts/layout/Layout'
import { useContext, useEffect, useReducer } from "react"
import DashboardContext, { DashboardProvider } from "../context/dashboard/dashboard_context"
import { DashbaordReducer, initialState } from "../context/dashboard/dashboard_reducer"
import { ActionType } from "../context/dashboard/dashboard_state"

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const at = req.cookies.AT

  const res = await fetch(`http://localhost:3333/user/profile`, {
    headers: {
      Authorization: `Bearer ${at} `
    }
  })
  const data = await res.json()
  console.log("hrelloooo", data);


  if (!res.ok || !data) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}

export type UserDetails = {
  data: {
    firstname: string
    lastname: string
    email: string
    phonenumber: number
  }
}

const Dashboard = ({ data }: UserDetails) => {
  // const [state, dispatch] = useReducer(userReducer, initialState);
  // const [state, dispatch] = useReducer(
  //   userReducer,
  //   { loggedInUser: data }
  // );

  // // console.log("SE NU", state);

  return (
    <>
      <DashboardProvider>
        <Layout pageTitle='Home'>
          <LandingPage data={data} />
        </Layout>
      </DashboardProvider>
    </>
  )
}

export default Dashboard