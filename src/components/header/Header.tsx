import { Button, ButtonGroup, Flex, Heading, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../../redux/authenticationActions'
import { selectAuthentication } from '../../redux/authenticationSlice'
import IsWindowSizeLargerThan from '../hooks/getWindowSize'
import Logo from './Logo'
import MobileMenu from './mobileMenu'

const Header: FC = () => {
  const authState = useSelector(selectAuthentication)

  const dispatch = useDispatch<any>()
  async function handleLogout() {
    dispatch(logoutThunk())
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const isWindowLargerThan = IsWindowSizeLargerThan(764)
  return (
    <Flex
      bg={colorMode === 'light' ? 'white' : 'dCompLBg'}
      minWidth="max-content"
      px={{ sm: 2, lg: 6 }}
      justifyContent={'space-between'}
      alignItems="center"
      gap="2"
      boxShadow={'lg'}
      py={{ sm: 2, lg: 4 }}
    >
      <Flex align="center">
        <Logo />
        <Heading fontSize={{ sm: 'sm', lg: '1xl' }} color={useColorModeValue('black', 'white')} textTransform="uppercase">
          VærkstedetCPH
        </Heading>
      </Flex>

      {isWindowLargerThan ? (
        <ButtonGroup gap="2" alignItems={'center'}>
          <IconButton
            onClick={toggleColorMode}
            isRound={true}
            size="md"
            icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
            aria-label={''}
          />
          {authState.authenticated ? (
            <Button px={{ sm: 4, lg: 8 }} fontSize={{ base: 'xs', lg: 'lg' }} variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : null}
        </ButtonGroup>
      ) : (
        authState.authenticated && <MobileMenu />
      )}
    </Flex>
  )
}

export default Header
