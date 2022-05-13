import type { NextPage } from 'next'
import { FC, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthenticatedPage from '../components/authenticationPage/AuthenticationPage'
import LandingPage from '../components/landing-page/LandingPage'

import Layout from '../components/layouts/layout/Layout'
import { Box, Skeleton } from '@chakra-ui/react'
import TestPage from './testpage'

const HomePage: FC<NextPage> = () => {
  const { user, isLoading, refreshTokens } = useAuth()

  useEffect(() => {
    refreshTokens()
  }, [])

  return (
    <>
      <Skeleton isLoaded={!isLoading}>{!isLoading && <TestPage />}</Skeleton>
      {/*      <Layout pageTitle='Home'>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <>
            
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

export default HomePage
