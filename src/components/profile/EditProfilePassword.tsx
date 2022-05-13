import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import React, { FC, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../forms/FormField";
import InputField from "../forms/Input";
import cookie from 'cookie'


type FormValues = {
    password: string
    passwordConfirm: string
}

type Props = {
    isOpen: boolean
    onClose: () => void
}

export const EditProfilePassword: FC<any> = ({ onClose }: Props) => {

    const methods = useForm<FormValues>({ mode: 'onBlur' })


    const {
        handleSubmit, watch,
        formState: { errors, isValid, isDirty },
    } = methods
    const password = useRef({})

    password.current = watch('password', '')


    const onSubmit: SubmitHandler<FormValues> = async (data) => {


        const body = {
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        }

        // const test = signup(body)
    }

    return (
        <>
            {/* <DrawerHeader borderBottomWidth='1px'>
                Change password
            </DrawerHeader> */}

            <DrawerBody py="10">
                <FormProvider {...methods}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Stack spacing='24px'>
                            <FormField
                                as={InputField}
                                name='password'
                                labeltitle='Password'
                                defaultValue=''
                                rules={{
                                    required: 'Required',
                                    pattern: {
                                        value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                        message: 'Password must be at least 8 characters long, have at least one uppercase letter and one numeric character',
                                    },
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
                        </Stack>
                    </form>
                </FormProvider>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button type='submit' colorScheme='blue'>Submit</Button>
            </DrawerFooter>
        </>
    )
}