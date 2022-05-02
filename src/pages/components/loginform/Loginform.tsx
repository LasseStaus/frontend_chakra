import { Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FC, useState } from 'react'
import login from '../../api/Login'

const Loginform: FC<any> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //toddo e type
  const handleLogin = async (e: any) => {
    console.log('handleLoginSubmit')
    e.preventDefault()
    console.log(`Signup with ${email} and ${password}`)
    const body: any = {
      email: email,
      password: password,
    }

    login(body)
  }

  return (
    <Container maxW={'container.sm'}>
      <FormControl>
        <FormLabel htmlFor='email'>Email address</FormLabel>
        <Input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit' onClick={handleLogin}>
        Submit
      </Button>{' '}
    </Container>
  )
}

export default Loginform
