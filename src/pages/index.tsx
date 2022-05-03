import { Button, Container, Flex, Heading, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Layout from './components/layouts/layout/Layout'
import Loginform from './components/loginform/Loginform'
import { useAuth } from './context/AuthContext'

const HomePage: FC<NextPage> = () => {
  const { user, login, logout, emailError, passwordError, isLoading } = useAuth()

  return (
    <>
      <Layout pageTitle='Home'>
        <Flex pb={10} flexDir='column'>
          <Heading>{user?.access_token !== undefined ? `welcome ${user.access_token}` : 'not logged in'}</Heading>
          <Heading textAlign={'center'} fontSize={'4xl'}>
            Welcome to henrik
          </Heading>
          <Loginform />

          <Container maxW={'container.sm'}>
            <Button onClick={logout}>LOG UD FOR HELVEDE</Button>
          </Container>
        </Flex>
      </Layout>
    </>
  )
}

export default HomePage
