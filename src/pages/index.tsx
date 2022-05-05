import type { NextPage } from 'next'
import { FC } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'

import Layout from '../components/layouts/layout/Layout'

const HomePage: FC<NextPage> = () => {
  const { user, login, logout, emailError, passwordError, isLoading } = useAuth()
  console.log('from state', user?.access_token)
  return (
    <>
      {/* <Layout pageTitle='Home'>{user?.access_token === undefined ? <LandingPage /> : <AuthenticatedPage />}</Layout> */}
      <Layout pageTitle='Home'>
        <LandingPage />
      </Layout>
    </>
  )
}

export default HomePage
