import { Box, Button, ButtonGroup, Flex, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutApi } from "../../redux/authenticationSlice"

import Logo from "./Logo"

const Header: FC = () => {
  const authenticated = useSelector((state: any) => state.user.authenticated)

  const dispatch = useDispatch<any>()
  async function handleLogout() {
    console.log("HANDLE LOGOUT")
    //todo why does it need data (its rejectWithValue in error) how to fix?
    dispatch(logoutApi("smt"))
  }

  return (
    <Flex bg="white" minWidth="max-content" pr="5" alignItems="center" gap="2">
      <Box p="2">
        <Logo />
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        {authenticated ? (
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </ButtonGroup>
    </Flex>
  )
}

export default Header
