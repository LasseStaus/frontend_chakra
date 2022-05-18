import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { NextApiResponse } from "next"
import { AppProps } from "next/app"
import { themeVaerkstedetCPH } from "../../styles/theme"
import { AuthProvider } from "../context/AuthContext"
import { BookingProvider } from "../context/bookingContext"

import { Provider } from "react-redux"
import { store } from "../redux/store"

const AppWrapper = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={themeVaerkstedetCPH}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ChakraProvider>
)

export default AppWrapper

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={themeVaerkstedetCPH}>
      {/*   <AuthProvider>
        <BookingProvider> */}

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      {/*         </BookingProvider>
      </AuthProvider> */}
    </ChakraProvider>
  )
}

/* export default MyApp */
