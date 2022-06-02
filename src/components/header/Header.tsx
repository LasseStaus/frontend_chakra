import { Button, ButtonGroup, Flex, Heading, Spacer } from '@chakra-ui/react'
import React, { FC } from 'react'
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
