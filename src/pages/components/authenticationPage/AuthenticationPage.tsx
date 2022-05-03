import { Box, Container, Heading } from '@chakra-ui/react'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Loginform from '../loginform/Loginform'

function AuthenticatedPage() {
  const { user, login, emailError, passwordError, isLoading } = useAuth()
  useEffect(() => {}, [])
  return (
    <Container maxW={'container.lg'}>
      <Box>
        <Heading>Login</Heading>
        <Loginform />
      </Box>
    </Container>
  )
}

export default AuthenticatedPage
