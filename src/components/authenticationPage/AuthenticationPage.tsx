import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AlertBox from '../alert/Alert'

// import { useAuth } from '../../context/AuthContext'
import Loginform from '../forms/Loginform'
import SignupForm from '../forms/Signupform'

function AuthenticatedPage() {
  const { user, login, isLoading, authAlertActive } = useAuth()
  // useEffect(() => { }, [])

  const [index, setTabIndex] = useState(0)
  const [status, setStatus] = useState(undefined)
  const [statusText, setStatusText] = useState(undefined)

  return (
    <>
      {authAlertActive && <AlertBox />}
      <Container maxW={'container.sm'}>
        <Box bg='white' boxShadow={'xl'}>
          <Tabs defaultIndex={0} index={index} onChange={(index) => setTabIndex(index)} isFitted variant='enclosed' border={'sm'}>
            <TabList p={0} boxShadow={'sm'}>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Loginform />
              </TabPanel>
              <TabPanel>
                <SignupForm setTabIndex={setTabIndex} setStatus={setStatus} setStatusText={setStatusText} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}

export default AuthenticatedPage
