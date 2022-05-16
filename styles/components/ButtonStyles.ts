import { whiten, mode, darken } from '@chakra-ui/theme-tools'

export const ButtonStyles = {
    // style object for base or default style
    baseStyle: {
        w: '100%',
        _disabled: {
            pointerEvents: 'none'
        }
    },

    // // styles for different sizes ("sm", "md", "lg")
    sizes: {
        // sm: {
        //     fontSize: 'sm',
        //     px: 4,
        //     py: 3,
        // },
        // md: {
        //     fontSize: 'md',
        //     px: 6,
        //     py: 4,
        // },
    },

    // styles for different visual variants ("outline", "solid")
    variants: {
        primary: (props: any) => ({
            // bg: mode(darken('primary', 20), whiten('primary', 20))(props),
            bg: 'primary',
            color: 'white',
            _hover: {
                bg: whiten("primary", 30)
            }
        }),
        secondary: (props: any) => ({
            bg: 'white',
            color: 'brandBlack',
            border: '1px',
            borderColor: 'BrandBlack',
            _hover: {
                borderColor: 'primary',
                color: 'primary',

            }
        }),
        linkButton: (props: any) => ({
            bg: 'none',
            color: 'brandBlack',
            border: 'none',
            _hover: {
                borderColor: 'primary',
                color: 'primary',

            }
        })
    },
    // default values for `size` and `variant`
    defaultProps: {
        variant: 'primary'
    },
}