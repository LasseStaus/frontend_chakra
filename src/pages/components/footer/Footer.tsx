import { Box, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import type { FC } from 'react'

type Props = {
  param?: string
}

type FooterLink = {
  name: string
  to: string
}

const links = [
  {
    name: 'Hjem',
    to: '/',
  },
  {
    name: 'Se opslag',
    to: '/opslag',
  },
  {
    name: 'Profil',
    to: '/profil',
  },
]

const Footer: FC<Props> = () => {
  const FooterLink = ({ name, to }: FooterLink) => (
    <Link href={to} passHref>
      <Text cursor={'pointer'} color={'white'} fontSize={'m'} fontWeight={'bold'} _hover={{ textDecoration: 'underline' }}>
        {name}
      </Text>
    </Link>
  )

  return (
    <>
      <Box bg={'gray.300'}>
        <Heading>This is the footer</Heading>
      </Box>
    </>
  )
}

export default Footer
