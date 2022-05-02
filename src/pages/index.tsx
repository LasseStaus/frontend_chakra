import { Button, Flex, Heading, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Layout from './components/layouts/layout/Layout'
import Loginform from './components/loginform/Loginform'

const HomePage: FC<NextPage> = () => (
  <Layout pageTitle='Home'>
    <Flex pb={10} flexDir='column'>
      <Heading textAlign={'center'} fontSize={'4xl'}>
        Welcome to henrik
      </Heading>
      <Loginform />
    </Flex>
    <Link>Go to user</Link>
  </Layout>
)

export default HomePage
