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
    brandRed: 'rgb(223, 90, 90)',
    brandBlue: '#1D5A8F',
    brandGreen: '#649B2C'
  },
  breakpoints: {
    sm: '220px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '1536px'
  },
  fonts: {
    heading: `'Dosis', sans-serif`,
    body: `'Dosis', sans-serif`
  },
  sizes: {
    container: {
      xs: '420px',
      xxl: '1440px'
    }
  },

  // --- components
  components: {
    Calendar: {
      parts: ['calendar'],

      baseStyle: {
        calendar: {
          borderWidth: '6px',
          borderColor: 'pink.400',
          rounded: 'none',
          shadow: 'none',
          boxShadow: '32px 16px 0 6px #3B4DCC'
        }
      }
    },

    CalendarControl: {
      parts: ['button'],

      baseStyle: {
        button: {
          h: 6,
          px: 2,
          rounded: 'none',
          fontSize: 'sm',
          color: 'white',
          bgColor: 'pink.400',

          _hover: {
            bgColor: 'pink.200'
          },

          _focus: {
            outline: 'none'
          }
        }
      }
    },

    Steps,

    Tabs: {
      colors: {
        bg: 'red'
      }
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
        componentHeader: {
          fontSize: { sm: '2xl', lg: '4xl' }
        }
      }
    },
    Text: {
      baseStyle: {
        color: 'brandBlack',
        lineHeight: '1.5',
        fontSize: 'sm'
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
        marginBottom: { sm: 6, xl: 8, xxl: 12 }
      },
      variants: {
        onlyPaddingX: {
          paddingTop: 'none',
          paddingBottom: 'none'
        },
        even: {
          paddingTop: { sm: 4, xl: 4, xxl: 9 },
          paddingBottom: { sm: 4, xl: 4, xxl: 9 }
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
