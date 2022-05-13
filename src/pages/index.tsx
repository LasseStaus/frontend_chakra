import cookie from 'cookie'
import LandingPage from "../components/landing-page/LandingPage"
import Layout from '../components/layouts/layout/Layout'
import { useContext, useEffect, useReducer } from "react"
import DashboardContext, { DashboardProvider } from "../context/dashboard/dashboard_context"
import { DashbaordReducer, initialState } from "../context/dashboard/dashboard_reducer"
import { ActionType, StateProps } from "../context/dashboard/dashboard_state"
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const at = req.cookies.AT

  const res = await fetch(`http://localhost:3333/user/profile`, {
    headers: {
      Authorization: `Bearer ${at} `
    }
  })

  const data = await res.json()


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

export const Dashboard = ({ data }: UserDetails) => {

  return (
    <>
      <DashboardContext.Provider value={data}>
        <Layout pageTitle='Home'>
          <LandingPage />
        </Layout>
      </DashboardContext.Provider>
    </>
  )
}

export default Dashboard