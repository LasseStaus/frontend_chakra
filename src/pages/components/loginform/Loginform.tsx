import { Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import { FC, useContext, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import login from '../../api/Old.Login'

const Loginform: FC<any> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, login, emailError, passwordError, isLoading } = useAuth()

  //toddo e type
  const handleLogin = async (e: any) => {
    console.log('handleLoginSubmit')
    e.preventDefault()
    console.log(`Signup with ${email} and ${password}`)
    const body: any = {
      email: email,
      password: password,
    }

    login({ email, password })
  }

  return (
    <Container maxW={'container.sm'}>
      <FormControl>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <Heading>{emailError ? emailError : 'no error'}</Heading>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Heading>{passwordError ? passwordError : 'no error'}</Heading>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit' onClick={handleLogin}>
        Submit
      </Button>{' '}
    </Container>
  )
}

export default Loginform
