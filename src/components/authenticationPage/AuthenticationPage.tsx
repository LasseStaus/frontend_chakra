import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAlertMessage } from '../../redux/authenticationSlice'
import { AppDispatch } from '../../redux/store'
import AlertBox from '../alert/Alert'
import Loginform from '../forms/Loginform'
import SignupForm from '../forms/Signupform'

export const AuthenticatedPage = () => {
  const [index, setTabIndex] = useState(0)
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const alertMessage = useSelector((state: any) => state.authentication.alertMessage)
  const alertType = useSelector((state: any) => state.authentication.alertType)

  // TO DO, maybe another solution to this?
  useEffect(() => {
    if (alertMessage != undefined) {
      const timeId = setTimeout(() => {
        dispatch(setAlertMessage(undefined))
      }, 7000)

      return () => {
        clearTimeout(timeId)
      }
    }
  })

  return (
    <>
      {alertMessage != undefined ? <AlertBox alertMessage={alertMessage} alertType={alertType} /> : null}
      <Container maxW={'container.sm'}>
        <Box bg="white" boxShadow={'xl'}>
          <Tabs defaultIndex={0} index={index} onChange={(index) => setTabIndex(index)} isFitted variant="enclosed" border={'sm'}>
            <TabList p={0} boxShadow={'sm'}>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
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
