import { Box, chakra, Container, Flex, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export const Footer = () => {
  return (
    <Container maxW={'container.xxl'} marginBottom={0}>
      <Flex
        bg={useColorModeValue('blackAlpha.100', 'blackAlpha.400')}
        position="absolute"
        bottom={0}
        left={0}
        w="full"
        color={useColorModeValue('gray.700', 'gray.100')}
        py={4}
        px={10}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2022 VærkstedetCPH</Text>
        <Stack direction={'row'} spacing={6} color={useColorModeValue('gray.900', 'primary')}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Footer
