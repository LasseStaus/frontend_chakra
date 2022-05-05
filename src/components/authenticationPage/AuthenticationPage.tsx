import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import AlertBox from '../alert/alert'
// import { useAuth } from '../../context/AuthContext'
import Loginform from '../forms/Loginform'
import SignupForm from '../forms/Signupform'

function AuthenticatedPage() {
  // const { user, login, emailError, passwordError, isLoading } = useAuth()
  // useEffect(() => { }, [])

  const [index, setTabIndex] = useState(0);
  const [status, setStatus] = useState(undefined);
  const [statusText, setStatusText] = useState(undefined);


  return (
    <>
      <AlertBox status={status} text={statusText} />
      <Container maxW={'container.lg'}>

        <Tabs defaultIndex={0} index={index} onChange={(index) => setTabIndex(index)} isFitted variant='enclosed'>
          <TabList mb='1em'>
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
      </Container>
    </>
  )

}

export default AuthenticatedPage