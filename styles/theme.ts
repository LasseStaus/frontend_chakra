import { extendTheme } from '@chakra-ui/react'

export const colors = {
  blue: {
    100: '#d7d8df',
    200: '#c2c4ce',
    300: '#aeb0be',
    400: '#9a9dae',
    500: '#86899e',
    600: '#72758e',
    700: '#5d617d',
    800: '#494e6d',
    900: '#353a5d',
  },
  red: {
    100: '#F5EEEE',
    200: '#F7E9E9',
    300: '#BF1E2E',
    400: '#AF3135',
    500: '#B03035',
    600: '#B03035',
    700: '#B03035',
    800: '#B03035',
    900: '#B03035',
  },
  gray: {
    100: '#FAF9F9',
    200: '#E8E8E8',
    300: '#CCCCCC',
    400: '#777777',
    500: '#777777',
  },
  green: {
    100: '#E2EBE7',
    400: '#33753E',
  },
}

export const DEFAULT_PADDING = 3

export const theme = extendTheme({
  colors,
  breakpoints: {
    sm: '220px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    xxl: '1536px',
  },
  components: {
    Skeleton: {
      defaultProps: {
        startColor: 'white',
        endColor: 'gray.200',
      },
    },
    Heading: {
      baseStyle: {
        color: 'blue.900',
        fontWeight: 'medium',
      },
      sizes: {
        xl: 'fontSizes in heading variants wont work if nothing is here, bug?',
      },
      variants: {
        xl: {
          fontSize: { sm: '4xl', lg: '6xl' },
        },
        large: {
          fontSize: { sm: '2xl', lg: '4xl' },
        },
        medium: {
          fontSize: { sm: 'xl', lg: '2xl' },
        },
        small: {
          fontSize: { sm: 'lg', lg: 'xl' },
        },
      },
    },

    Text: {
      baseStyle: {
        color: 'gray.500',
        lineHeight: '1.5',
        fontSize: '0.9rem',
      },
      variants: {
        subheader: {
          color: 'blue.900',
          fontWeight: '900',
          fontSize: { sm: '1rem', lg: '1.125rem' },
          mb: 2,
        },
      },
    },
    Container: {
      baseStyle: {
        paddingTop: { sm: 10, xl: 12, xxl: 20 },
        paddingBottom: { sm: 10, xl: 12, xxl: 20 },
      },
      variants: {
        onlyPaddingX: {
          paddingTop: 'none',
          paddingBottom: 'none',
        },
        halfPaddingBot: {
          paddingBottom: { sm: 5, xl: 6, xxl: 10 },
        },
        halfPaddingY: {
          paddingTop: { sm: 5, xl: 6, xxl: 10 },
          paddingBottom: { sm: 5, xl: 6, xxl: 10 },
        },
      },
    },
  },
  fonts: {
    heading: 'Oswald',
    body: 'Montserrat',
  },

  sizes: {
    container: {
      xs: '420px',
      xxl: '1440px',
    },
  },
})
