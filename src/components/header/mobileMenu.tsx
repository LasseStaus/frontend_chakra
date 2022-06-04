import { AddIcon, ChevronDownIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  IconButton,
  Box,
  useColorMode,
  Icon,
  Flex
} from '@chakra-ui/react'
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
          <MenuItem py={6}>
            <Box onClick={handleLogout}>
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
