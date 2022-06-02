import { Box, Button, ButtonGroup, Container, Flex, Heading, IconButton, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../../redux/authenticationActions'
import { selectAuthentication } from '../../redux/authenticationSlice'
import Logo from './Logo'

const Header: FC = () => {
  const authState = useSelector(selectAuthentication)

  const dispatch = useDispatch<any>()
  async function handleLogout() {
    dispatch(logoutThunk())
  }

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      bg="white"
      minWidth="max-content"
      px={{ sm: 2, lg: 6 }}
      justifyContent={'space-between'}
      alignItems="center"
      gap="2"
      boxShadow={'lg'}
      py={{ sm: 2, lg: 4 }}
    >
      <Flex align="center">
        <Logo height={{ sm: '35px', lg: '50px' }} />
        <Heading fontSize={{ sm: 'sm', lg: '1xl' }} textTransform="uppercase">
          VærkstedetCPH
        </Heading>
      </Flex>
      <Spacer />
      <ButtonGroup gap="2">
        <IconButton
          onClick={toggleColorMode}
          isRound={true}
          size="lg"
          icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
          aria-label={''}
        />
        {authState.authenticated ? (
          <Button px={{ sm: 4, lg: 8 }} fontSize={{ base: 'xs', lg: 'lg' }} variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </ButtonGroup>
    </Flex>
  )
}

export default Header
