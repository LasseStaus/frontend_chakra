import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextApiResponse } from 'next'
import { AppProps } from 'next/app'
import { themeVaerkstedetCPH } from '../../styles/theme'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={themeVaerkstedetCPH}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
