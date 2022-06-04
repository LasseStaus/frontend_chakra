import { Flex, useColorModeValue } from '@chakra-ui/react'
import Head from 'next/head'
import type { FC, ReactNode } from 'react'
import Footer from '../../footer/Footer'
import Header from '../../header/Header'

export type BaseLayoutProps = {
  pageTitle: string
  children: ReactNode
}

// const bg = useColorModeValue('red.500', 'red.200')

const BaseLayout: FC<BaseLayoutProps> = (p: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>{p.pageTitle} | CPH Værksted</title>
      </Head>
      <Flex minH={'100vh'} bg={useColorModeValue('brandGrey', 'dCord1')} flexDir={'column'}>
        <Header />

        <Flex position={'relative'} height={'100%'} flexDir="column">
          {p.children}
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}

export default BaseLayout
