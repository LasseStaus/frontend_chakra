import { Box, Button, Container } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { LoginProps } from '../types/AuthTypes'
import { loginThunk } from '../../redux/authenticationActions'
import { FormField } from './FormField'
import { InputField } from './Input'

const Loginform = () => {
  const methods = useForm<LoginProps>({ mode: 'onChange' })
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = methods // destructer methods to use in return

  const dispatch = useDispatch<any>()

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    dispatch(loginThunk(data)).then((responseData: any) => {
      if (responseData.type === 'authentication/signup/fulfilled') {
        reset({ email: '', password: '' })
      }
    })
  }

  const userMessage = useSelector((state: any) => state.authentication.loginMessageForUser)
  return (
    <>
      <Container maxW={'container.sm'} variant={'halfPaddingY'}>
        {userMessage && <Box>{userMessage} </Box>}
        {/* Pass all methods into context */}
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
            {/* "handleSubmit" will validate inputs before invoking "onSubmit"  */}
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
