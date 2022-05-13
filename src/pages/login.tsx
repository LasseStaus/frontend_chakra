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
                <AuthenticatedPage />
            </Layout>
        </>
    )
}

export default TestPage
