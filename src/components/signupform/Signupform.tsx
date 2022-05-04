import { useForm } from 'react-hook-form'
import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

  useEffect(() => {
    console.log(email)
    console.log(password)
  }, [email, password])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='email'>First name</FormLabel>
        <Input
          id='email'
          placeholder='Enter Email'
          {...register('email', {
            required: 'This is required',
            value: email,
            onChange: (e) => setPassword(e.target.value),
            pattern: /^S+@S+.S+$/,
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id='password'
          placeholder='Enter password'
          {...register('password', {
            value: password,
            required: 'This is required',
            minLength: { value: 8, message: 'Minimum length should be 8' },
            onChange: (e) => setPassword(e.target.value),
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        <FormLabel htmlFor='confirmPassword'>Password</FormLabel>
        <Input
          id='confirmPassword'
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: 'This is required',
            minLength: { value: 8, message: 'Minimum length should be 8' },
          })}
        />
        <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  )
}
