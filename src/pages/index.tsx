import type { NextPage } from 'next'
import { FC } from 'react'
import AuthenticatedPage from './components/authenticationPage/AuthenticationPage'
import LandingPage from './components/landing-page/LandingPage'

import Layout from './components/layouts/layout/Layout'
import { useAuth } from './context/AuthContext'

const HomePage: FC<NextPage> = () => {
  const { user, login, logout, emailError, passwordError, isLoading } = useAuth()
  console.log('from state', user.access_token)
  return (
    <>
      <Layout pageTitle='Home'>{user.access_token === undefined ? <LandingPage /> : <AuthenticatedPage />}</Layout>
    </>
  )
}

export default HomePage
