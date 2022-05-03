import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from './context/AuthContext'

function User() {
  const { user, login, emailError, passwordError, isLoading } = useAuth()

  return (
    <Box>
      <Heading>Hello you are logged in with:</Heading>
      <Heading> {user?.access_token}</Heading>
      <Heading>RT: {user?.refresh_token}</Heading>
      <Heading>Hello you are logged in with:</Heading>
    </Box>
  )
}

export default User
