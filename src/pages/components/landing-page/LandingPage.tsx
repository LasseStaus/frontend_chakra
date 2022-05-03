import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FC } from 'react'
import { useAuth } from '../../context/AuthContext'

function AuthenticatedPage() {
  const { user, login, logout, emailError, passwordError, isLoading } = useAuth()
  console.log('from state', user.access_token)
  return (
    <>
      <Flex pb={10} flexDir='column'>
        <Heading textAlign={'center'} fontSize={'4xl'}>
          Welcome, your access token is {user.access_token}
        </Heading>

        <Container maxW={'container.sm'}>
          <Button onClick={logout}>LOG UD FOR HELVEDE</Button>
        </Container>
      </Flex>
    </>
  )
}

export default AuthenticatedPage
