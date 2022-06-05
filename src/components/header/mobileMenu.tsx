import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, useColorMode } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { GiExitDoor } from 'react-icons/gi'
import { useDispatch } from 'react-redux'
import { logoutThunk } from '../../redux/authenticationActions'
import { AppDispatch } from '../../redux/store'

const MobileMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const dispatch: AppDispatch = useDispatch()
  const icon = colorMode === 'light' ? <FaSun /> : <FaMoon color="white" />

  async function handleLogout() {
    dispatch(logoutThunk())
  }

  return (
    <Box width={'max-content'} zIndex="100">
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
        <MenuList py={0} gap={2}>
          <MenuItem py={6} onClick={handleLogout}>
            <Box>
              <Icon as={GiExitDoor} mr={2} />
              Logout
            </Box>
          </MenuItem>

          <MenuItem py={6}>
            <Flex alignItems={'center'}>
              <Box onClick={toggleColorMode} alignItems={'center'} display="flex" gap={2}>
                {icon}
                {colorMode === 'light' ? 'Toggle light mode' : 'Dark mode'}
              </Box>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default MobileMenu
