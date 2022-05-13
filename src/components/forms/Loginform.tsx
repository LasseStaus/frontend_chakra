import { Button, Container } from '@chakra-ui/react'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { FormField } from './FormField'
import { InputField } from './Input'

type FormValues = {
  email: string
  password: string
}

//TO DO backend error message?
const Loginform: FC<any> = (props) => {
  const { user, login, isLoading } = useAuth()

  const methods = useForm<FormValues>({ mode: 'onBlur' })
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = methods

  //toddo e type
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('handleLoginSubmit')
    console.log(`Signup with ${data.email} and ${data.password}`)

    const body = { email: data.email, password: data.password }

    login(body) // TO DO API KALD I CONTEXT DRILLER, MÅSKE FORDI COMPONENTS ER RYKKET UD FRA PAGES MAPPEN?
  }

  return (
    <>
      <Container maxW={'container.sm'}>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              as={InputField}
              name='email'
              labeltitle='Email'
              defaultValue=''
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              errors={errors.email}
            />
            <FormField
              as={InputField}
              name='password'
              labeltitle='Password'
              defaultValue=''
              type="password"
              rules={{
                required: 'Required',
                minLength: {
                  value: 8,
                  message: 'Password must be between 8 and 50 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Password must be between 8 and 50 characters',
                },
              }}
              errors={errors.password}
            />
            <Button disabled={!isDirty || !isValid} mt={4} colorScheme='teal' type='submit' isLoading={props.isSubmitting} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Container>
    </>
  )
}

export default Loginform
