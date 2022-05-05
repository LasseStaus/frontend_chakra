import { Button, Container } from '@chakra-ui/react'

import React from 'react'
import { FC, useRef } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { FormField } from './FormField'
import { InputField } from './Input'

type FormValues = {
  firstname: string
  lastname: string
  email: string
  phonenumber: string
  password: string
  passwordConfirm: string
}

const SignupForm: FC<any> = (props) => {
  const { user, login, signup, isLoading } = useAuth()

  const methods = useForm<FormValues>({ mode: 'onChange' })
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = methods
  const password = useRef({})

  password.current = watch('password', '')

  //toddo e type
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    /*     props.setStatus('success')
    props.setStatusText('Congratulations, your account has been successfully created')
    props.setTabIndex(0) */
    const body = {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      phonenumber: data.phonenumber,
      passwordConfirm: data.passwordConfirm,
    }

    const test = signup(body)
    console.log('SIGNUP KNAP', test)
  }

  return (
    <>
      <Container maxW={'container.sm'}>
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              as={InputField}
              name='firstname'
              labeltitle='First Name'
              defaultValue=''
              rules={{
                required: 'Required',
                minLength: {
                  value: 2,
                  message: 'First name must be a minimum of 2 characters',
                },
              }}
              errors={errors.firstname}
            />
            <FormField
              as={InputField}
              name='lastname'
              labeltitle='Last Name'
              defaultValue=''
              rules={{
                required: 'Required',
                minLength: {
                  value: 2,
                  message: 'Last name must be a minimum of 2 characters',
                },
              }}
              errors={errors.lastname}
            />
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
              name='phonenumber'
              labeltitle='Phonenumber'
              defaultValue=''
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[1-9]\d{7}$/,
                  message: 'Phone number cannot start with a 0, and must be 8 digits',
                },
              }}
              errors={errors.phonenumber}
            />
            <FormField
              as={InputField}
              name='password'
              labeltitle='Password'
              defaultValue=''
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
            <FormField
              as={InputField}
              name='passwordConfirm'
              labeltitle='Confirm Password'
              defaultValue=''
              rules={{
                required: 'Required',
                validate: (value) => value === password.current || 'The passwords do not match',
              }}
              errors={errors.passwordConfirm}
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

export default SignupForm
