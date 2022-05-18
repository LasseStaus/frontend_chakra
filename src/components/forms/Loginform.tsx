import { Button, Container } from '@chakra-ui/react'
import { FC, useContext } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { login } from '../../context/AuthActions'
import { AuthContext } from '../../context/AuthContext'
import { ActionTypes } from '../../context/AuthReducer'
import { LoginProps } from '../../context/AuthTypes'
import { FormField } from './FormField'
import { InputField } from './Input'

const Loginform = () => {

  const { state, dispatch } = useContext(AuthContext);

  const methods = useForm<LoginProps>({ mode: 'onChange' })
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = methods

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    login(data)
      .then(user =>
        dispatch({
          type: ActionTypes.LOGIN,
          payload: user
        }));
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
            <Button disabled={!isDirty || !isValid} mt={4} colorScheme='teal' type='submit' onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Container>
    </>
  )
}

export default Loginform
