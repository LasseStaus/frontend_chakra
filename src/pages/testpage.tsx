import type { NextPage } from 'next'
import { FC } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'

import Layout from '../components/layouts/layout/Layout'
import { Box, Skeleton } from '@chakra-ui/react'
function TestPage() {
  const { user, login, logout, isLoading } = useAuth()
  console.log('from state', user?.access_token)
  return (
    <>
      <Layout pageTitle='Home'>
        {user?.access_token && isLoading !== true ? <LandingPage /> : <AuthenticatedPage />}
      </Layout>
      {/*      <Layout pageTitle='Home'>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <>
            {user?.access_token ? <LandingPage /> : <AuthenticatedPage />}
            <Box>not loading...</Box>
            <Box>not loading...</Box>
            <Box>not loading...</Box>
            <Box>not loading...</Box>
            <Box>not loading...</Box>
            <Box>not loading...</Box>
          </>
        )}
      </Layout> */}
    </>
  )
}

export default TestPage
