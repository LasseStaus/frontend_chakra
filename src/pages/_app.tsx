import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { themeVaerkstedetCPH } from '../../styles/theme'
import '../../styles/styles.css'
import { store } from '../redux/store'
import '@fontsource/dosis'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

const AppWrapper = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={themeVaerkstedetCPH}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ChakraProvider>
)

export default AppWrapper
