import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userSlice'
import AlertBox from '../alert/Alert'
import Loginform from '../forms/Loginform'
import SignupForm from '../forms/Signupform'

export const AuthenticatedPage = () => {
  const [index, setTabIndex] = useState(0)

  const alertMessage = useSelector((state: any) => state.authentication.alertMessage)
  const alertType = useSelector((state: any) => state.authentication.alertType)
  const userState = useSelector(selectUser)
  console.log('USER auth pagen', userState)

  return (
    <>
      {alertMessage != undefined ? <AlertBox alertMessage={alertMessage} alertType={alertType} /> : null}
      <Container maxW={'container.sm'} variant={'onlyX'} marginTop={{ sm: 12, lg: 24 }}>
        <Box bg={useColorModeValue('white', 'dCord4')} boxShadow={'base'} mt={12} borderRadius={6}>
          <Tabs defaultIndex={0} index={index} onChange={(index) => setTabIndex(index)} isFitted variant="enclosed" border={'sm'}>
            <TabList p={0} boxShadow={'sm'}>
              <Tab
                textTransform="uppercase"
                color={useColorModeValue('blackAlpha.500', 'dCord2')}
                bg={useColorModeValue('white', 'whiteAlpha.50')}
                fontWeight="bold"
                _selected={{ bg: useColorModeValue('primary', 'whiteAlpha.200'), color: useColorModeValue('white', 'primary') }}
              >
                Login
              </Tab>
              <Tab
                textTransform="uppercase"
                color={useColorModeValue('blackAlpha.500', 'dCord2')}
                bg={useColorModeValue('white', 'whiteAlpha.50')}
                fontWeight="bold"
                _selected={{ bg: useColorModeValue('primary', 'whiteAlpha.200'), color: useColorModeValue('white', 'primary') }}
              >
                Signup
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Loginform />
              </TabPanel>
              <TabPanel>
                <SignupForm setTabIndex={setTabIndex} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}

export default AuthenticatedPage
