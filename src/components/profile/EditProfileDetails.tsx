import { Button, DrawerBody, DrawerFooter, Stack } from '@chakra-ui/react'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { EditUserProps } from '../types/AuthTypes'
import { AppDispatch } from '../../redux/store'
import { editUserInfo } from '../../redux/userActions'
import { FormField } from '../forms/FormField'
import InputField from '../forms/Input'
import { selectUser } from '../../redux/userSlice'

interface Props {
  onClose: () => void
}

export const EditProfileDetails = ({ onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const userState = useSelector(selectUser)

  const methods = useForm<EditUserProps>({
    mode: 'onBlur',
    defaultValues: {
      firstname: userState.user.firstname,
      lastname: userState.user.lastname,
      email: userState.user.email,
      phonenumber: userState.user.phonenumber
    }
  })

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = methods

  const onSubmit: SubmitHandler<EditUserProps> = async (data) => {
    const body = {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phonenumber
    }
    dispatch(editUserInfo(body))
    onClose()
  }

  return (
    <>
      <DrawerBody py="10">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing="24px">
              <FormField
                as={InputField}
                name="firstname"
                labeltitle="First Name"
                rules={{
                  required: 'Required',
                  minLength: {
                    value: 2,
                    message: 'First name must be a minimum of 2 characters'
                  }
                }}
                errors={errors.firstname}
              />
              <FormField
                as={InputField}
                name="lastname"
                labeltitle="Last Name"
                rules={{
                  required: 'Required',
                  minLength: {
                    value: 2,
                    message: 'Last name must be a minimum of 2 characters'
                  }
                }}
                errors={errors.lastname}
              />
              <FormField
                as={InputField}
                name="email"
                labeltitle="Email"
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
                name="phonenumber"
                labeltitle="Phonenumber"
                rules={{
                  required: 'Required',
                  pattern: {
                    value: /^[1-9]\d{7}$/,
                    message: 'Phone number cannot start with a 0, and must be 8 digits'
                  }
                }}
                errors={errors.phonenumber}
              />
            </Stack>
          </form>
        </FormProvider>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!isDirty || !isValid} type="submit" colorScheme="blue" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </DrawerFooter>
    </>
  )
}
