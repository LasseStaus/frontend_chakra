import { Box, Button, ButtonGroup, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Logo from './Logo'

const Header: FC = () => {
  const { user, logout } = useAuth()

  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()

  return (
    <Flex bg="Highlight" minWidth='max-content' pr="5" alignItems='center' gap='2'>
      <Box p='2'>
        <Logo />
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        {user?.access_token ? <Button colorScheme='teal' onClick={logout}>Logout</Button> : null}
      </ButtonGroup>
    </Flex>

  )
}

export default Header
