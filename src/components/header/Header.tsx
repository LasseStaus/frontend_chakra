import { Box, Button, ButtonGroup, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { FC, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ActionTypes } from '../../context/AuthReducer'
// import logout from '../../pages/api/logout'
// import { useAuth } from '../../context/AuthContext'
import Logo from './Logo'
import { logout } from '../../context/AuthActions'


const Header: FC = () => {
  // const { user, logout } = useAuth()
  const { state, dispatch } = useContext(AuthContext);
  const { loggedInUser } = state

  async function handleLogout() {
    await logout().then(response => {
      if (response.ok) {
        dispatch({ type: ActionTypes.LOGOUT })
      }
    })
  }

  return (
    <Flex bg='white' minWidth='max-content' pr='5' alignItems='center' gap='2'>
      <Box p='2'>
        <Logo />
      </Box>
      <Spacer />
      <ButtonGroup gap='2'>
        {loggedInUser ? (
          <Button colorScheme='teal' onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </ButtonGroup>
    </Flex>
  )
}

export default Header
