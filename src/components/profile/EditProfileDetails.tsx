import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { EditUserProps } from '../../context/AuthTypes'
import { FormField } from '../forms/FormField'
import InputField from '../forms/Input'

interface Props {
    onClose: () => void
}

export const EditProfileDetails = ({ onClose }: Props) => {

    const { user, editUser } = useAuth()
    const methods = useForm<EditUserProps>({ mode: 'onBlur', defaultValues: { firstname: user?.firstname, lastname: user?.lastname, email: user?.email, phonenumber: user?.phonenumber } })

    const {
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = methods

    const onSubmit: SubmitHandler<EditUserProps> = async (data) => {
        const body = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phonenumber,
        }
        editUser(body)
        onClose()
    }

    return (
        <>
            <DrawerBody py='10'>
                <FormProvider {...methods}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack spacing='24px'>
                            <FormField
                                as={InputField}
                                name='firstname'
                                labeltitle='First Name'
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
                                rules={{
                                    required: 'Required',
                                    pattern: {
                                        value: /^[1-9]\d{7}$/,
                                        message: 'Phone number cannot start with a 0, and must be 8 digits',
                                    },
                                }}
                                errors={errors.phonenumber}
                            />
                        </Stack>
                    </form>
                </FormProvider>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={!isDirty || !isValid} type='submit' colorScheme='blue' onClick={handleSubmit(onSubmit)}>
                    Submit
                </Button>
            </DrawerFooter>
        </>
    )
}
