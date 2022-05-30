import { Box, Button, ButtonGroup, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../../redux/authenticationActions'

import Logo from './Logo'

const Header: FC = () => {
  const authenticated = useSelector((state: any) => state.authentication.authenticated)

  const dispatch = useDispatch<any>()
  async function handleLogout() {
    dispatch(logoutThunk())
  }

  return (
    <Flex bg="white" minWidth="max-content" px={8} alignItems="center" gap="2" boxShadow={'lg'}>
      <Flex p="4" align="center">
        {/* <Logo /> */}
        <Heading fontSize="2xl" textTransform="uppercase">
          VærkstedetCPH
        </Heading>
      </Flex>
      <Spacer />
      <ButtonGroup gap="2">
        {authenticated ? (
          <Button px={8} variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </ButtonGroup>
    </Flex>
  )
}

export default Header
