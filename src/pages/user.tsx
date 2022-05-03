import { Box, Heading } from '@chakra-ui/react'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function User() {
  const { user, login, emailError, passwordError, isLoading } = useAuth()
  useEffect(() => {
    if (!user) router.push('/')
  }, [])
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
