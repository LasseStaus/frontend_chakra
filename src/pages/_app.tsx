import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextApiResponse } from 'next'
import { AppProps } from 'next/app'
import { themeVaerkstedetCPH } from '../../styles/theme'
import { AuthProvider } from '../context/AuthContext'
import { BookingProvider } from '../context/bookingContext'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={themeVaerkstedetCPH}>
      <AuthProvider>
        <BookingProvider>
          <Component {...pageProps} />
        </BookingProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
