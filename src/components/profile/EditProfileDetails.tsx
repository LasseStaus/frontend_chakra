import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { FormField } from '../forms/FormField'
import InputField from '../forms/Input'

type FormValues = {
    firstname: string
    lastname: string
    email: string
    phonenumber: number
}

type Props = {
    isOpen: boolean
    onClose: () => void
}

export const EditProfileDetails: FC<any> = ({ isOpen, onClose }: Props) => {
    const { user, editUser } = useAuth()
    const methods = useForm<FormValues>({ mode: 'onBlur', defaultValues: { firstname: user?.firstname, lastname: user?.lastname, email: user?.email, phonenumber: user?.phonenumber } })
    const firstname = 'Johanne'
    const lastname = 'Justesen'
    // TO DO FETCH EXISTING DATA
    // TO DO UPDATE USERINFO

    const {
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = methods

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const body = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phonenumber,
        }
        editUser(body)
        onClose()
        // const test = signup(body)
    }

    return (
        <>
            {/* <DrawerHeader borderBottomWidth='1px'>
                Change your personal details
            </DrawerHeader> */}

            <DrawerBody py='10'>
                <FormProvider {...methods}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack spacing='24px'>
                            <FormField
                                as={InputField}
                                name='firstname'
                                labeltitle='First Name'
                                defaultValue={firstname}
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
                        </Stack>
                    </form>
                </FormProvider>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button type='submit' colorScheme='blue' onClick={handleSubmit(onSubmit)}>
                    Submit
                </Button>
            </DrawerFooter>
        </>
    )
}
