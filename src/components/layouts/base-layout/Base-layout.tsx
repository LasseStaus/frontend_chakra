import type { FC, ReactNode } from 'react'
import Head from 'next/head'

import { Box } from '@chakra-ui/react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

export type BaseLayoutProps = {
  pageTitle: string
  children: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = (p: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>{p.pageTitle} | CPH Værksted</title>
      </Head>
      <Box minH={'100vh'} bg={'gray.100'} flexDir={'column'}>
        <Header />
        <main>{p.children}</main>
        <Footer />
      </Box>
    </>
  )
}

export default BaseLayout
