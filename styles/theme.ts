import { extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'
import { ButtonStyles as Button } from '../styles/components/ButtonStyles'

export const themeVaerkstedetCPH = extendTheme({
  colors: {
    primary: '#DD9933',
    primaryLight: '#E8C289',
    brandBlack: '#514C4C',
    brandWhite: '#FFFFFF',
    brandGrey: '#F6F6F6',
    
  },
  breakpoints: {
    sm: '220px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '1536px'
  },
  fonts: {
    heading: 'Inter', // kan vi ændre
    body: 'Inter'
  },
  sizes: {
    container: {
      xs: '420px',
      xxl: '1440px'
    }
  },

  // --- components
  components: {
    Steps,

    Tabs: {

colors: {
  bg: 'red'
},

    },
    Button,
    Heading: {
      baseStyle: {
        color: 'blue.900',
        fontWeight: 'medium'
      },
      sizes: {
        xl: 'fontSizes in heading variants wont work if nothing is here, bug?'
      },
      variants: {
        xl: {
          fontSize: { sm: '4xl', lg: '6xl' }
        },
        large: {
          fontSize: { sm: '2xl', lg: '4xl' }
        },
        medium: {
          fontSize: { sm: 'xl', lg: '2xl' }
        },
        small: {
          fontSize: { sm: 'lg', lg: 'xl' }
        },
        componentHeader:{
          fontSize: { sm: '2xl', lg: '4xl' }

        }
      }
    },
    Text: {
      baseStyle: {
        color: 'gray.500',
        lineHeight: '1.5',
        fontSize: '0.9rem'
      },
      variants: {
        subheader: {
          color: 'blue.900',
          fontWeight: '900',
          fontSize: { sm: '1rem', lg: '1.125rem' },
          mb: 2
        }
      }
    },
    Container: {
      baseStyle: {
        paddingTop: { sm: 10, xl: 12, xxl: 20 },
        paddingBottom: { sm: 10, xl: 12, xxl: 20 },
        marginTop: { sm: 6, xl: 8, xxl: 12 },
        marginBottom: { sm: 6, xl: 8, xxl: 12 },
      },
      variants: {
        onlyPaddingX: {
          paddingTop: 'none',
          paddingBottom: 'none'
        },
        even: {
          paddingTop: { sm: 4, xl: 4, xxl: 9 },
          paddingBottom: { sm: 4, xl: 4, xxl: 9 },
        },
        halfPaddingBot: {
          paddingBottom: { sm: 5, xl: 6, xxl: 10 }
        },
        halfPaddingY: {
          paddingTop: { sm: 5, xl: 6, xxl: 10 },
          paddingBottom: { sm: 5, xl: 6, xxl: 10 }
        }
      }
    }
  }
})

