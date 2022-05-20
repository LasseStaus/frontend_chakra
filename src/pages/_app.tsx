import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { themeVaerkstedetCPH } from '../../styles/theme'
import { store } from '../redux/store'

const AppWrapper = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={themeVaerkstedetCPH}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ChakraProvider>
)

export default AppWrapper
