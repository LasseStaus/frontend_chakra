import { Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import { FC, useContext, useState } from 'react'
import { appendErrors, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import login from '../../pages/api/Old.Login'
import { FormField } from './FormField'
import { InputField } from './Input'

type FormValues = {
  email: string;
  password: string
}

const Loginform: FC<any> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, login, emailError, passwordError, isLoading } = useAuth()

  const methods = useForm<FormValues>({ mode: "onChange" });
  const {
    handleSubmit, formState: { isValid, isDirty }, } = methods

  //toddo e type
  const handleLogin: SubmitHandler<FormValues> = async (data) => {
    console.log('handleLoginSubmit')
    console.log(`Signup with ${data.email} and ${data.password}`)

    login({ email: data.email, password: data.password }) // TO DO API KALD I CONTEXT DRILLER, MÅSKE FORDI COMPONENTS ER RYKKET UD FRA PAGES MAPPEN?
  }

  // TO DO MANGLER CHAKRA UI hvis nødvendigt
  return (
    <>
      <Container maxW={'container.sm'}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormField
              as={InputField}
              name="email"
              labeltitle="Email"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Required"
                }
              }}
            />
            <FormField
              as={InputField}
              name="password"
              labeltitle="Password"
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Required"
                }
              }}
            />
            <Button mt={4} colorScheme='teal' type="submit" isLoading={props.isSubmitting}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Container>

    </>
  )
}

export default Loginform
