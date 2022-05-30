import type { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box, useColorModeValue } from '@chakra-ui/react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

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
      <Box minH={'100vh'} bg="brandGrey" flexDir={'column'}>
        <Header />
        <main>
          <Box position={'relative'}>{p.children}</Box>
        </main>
        <Footer />
      </Box>
    </>
  )
}

export default BaseLayout
