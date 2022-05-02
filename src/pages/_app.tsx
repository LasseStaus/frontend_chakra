import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextApiResponse } from 'next'
import { AppProps } from 'next/app'
import { theme } from '../../styles/theme'
import { AuthProvider } from './context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
