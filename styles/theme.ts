import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'
import { ButtonStyles as Button } from '../styles/components/ButtonStyles'

export const themeVaerkstedetCPH = extendTheme({
  colors: {
    primary: '#DD9933',
    primaryLight: '#E8C289',
    brandBlack: '#323232',
    brandWhite: '#FFFFFF',
    brandGrey: '#F6F6F6',
    brandRed: 'rgb(223, 90, 90)',
    brandBlue: '#2D79BC',
    brandGreen: '#649B2C',
    brandDark: {
      100: '#323232',
      200: '#424242'
    },

    dDarkBg: '#0F1117',
    dMainBg: '#3D434B',
    dCompBg: '#212529',
    dCompLBg: '#272B2F',
    dCord1: '#23272a',
    dCord2: '#99aab5',
    dCord3: '#2c2f33',
    dCord4: '#2C2F33',
    dCord5: 'rgba(97, 95, 95, 0.301)'
  },
  breakpoints: {
    sm: '220px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '1536px'
  },
  fonts: {
    heading: `'Dosis', 'sans-serif'`,
    body: `'Dosis', 'sans-serif'`
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
    Table: {
      variants: {
        adminTable: (props: any) => ({
          th: {
            background: 'initial'
          },
          tr: {
            _even: {
              backgroundColor: mode('blackAlpha.200', 'dCord5')(props)
            }
          }
        })
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
        darkMode: (props: any) => ({
          bg: mode('green', 'red')(props),
          color: mode('green', 'red')(props)
        }),
        lighterDarkMode: (props: any) => ({
          bg: mode('brandWhite', 'dCord4')(props),
          color: mode('brandBlack', 'whiteAlpha.800')(props),
          paddingTop: { sm: 4, xl: 4, xxl: 9 },
          paddingBottom: { sm: 4, xl: 4, xxl: 9 }
        }),
        onlyPaddingX: {
          paddingTop: 'none',
          paddingBottom: 'none'
        },
        onlyX: {
          paddingTop: 'none',
          paddingBottom: 'none',
          marginTop: 'none',
          marginBottom: 'none'
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
