import { Button, Container } from '@chakra-ui/react'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { LoginProps } from '../../context/AuthTypes'
import { FormField } from './FormField'
import { InputField } from './Input'

const Loginform = () => {
  const methods = useForm<LoginProps>({ mode: 'onChange' })
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = methods

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const body = { email: data.email, password: data.password }
  }
  return (
    <>
      <Container maxW={'container.sm'}>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              as={InputField}
              name="email"
              labeltitle="Email"
              defaultValue=""
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              errors={errors.email}
            />
            <FormField
              as={InputField}
              name="password"
              labeltitle="Password"
              defaultValue=""
              type="password"
              rules={{
                required: 'Required',
                minLength: {
                  value: 8,
                  message: 'Password must be between 8 and 50 characters'
                },
                maxLength: {
                  value: 50,
                  message: 'Password must be between 8 and 50 characters'
                }
              }}
              errors={errors.password}
            />
            <Button disabled={!isDirty || !isValid} mt={4} colorScheme="teal" type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Container>
    </>
  )
}

export default Loginform
