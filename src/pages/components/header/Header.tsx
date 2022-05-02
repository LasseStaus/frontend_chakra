import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import React, { FC, useState } from 'react'

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure()

  return (
    <Box h={'70px'}>
      <Text>This is a header</Text>

      <Button></Button>
    </Box>
  )
}

export default Header
