import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../forms/FormField";
import InputField from "../forms/Input";
import { EditProfileDetails } from "./EditProfileDetails";
import { EditProfilePassword } from "./EditProfilePassword";

type FormValues = {
    firstname: string
    lastname: string
    email: string
    phonenumber: string
}

type Props = {
    isOpen: boolean
    onClose: () => void
    data: any
}

// export async function getInitialProps() {

//     const response = await fetch(`http://localhost:3000/api/getUser`)

//     const data = await response.json()

//     return {
//         props: { data }, // Will be passed to the page component as props
//     }
// }

export const EditProfile: FC<any> = ({ isOpen, onClose, data }: Props) => {

    const methods = useForm<FormValues>({ mode: 'onChange' })


    const {
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = methods

    const onSubmit: SubmitHandler<FormValues> = async (data) => {


        const body = {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phonenumber: data.phonenumber,
        }

        // const test = signup(body)
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size="lg"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <Tabs>
                        <TabList pt="5">
                            <Tab fontSize="lg">Change personal details</Tab>
                            <Tab fontSize="lg">Change Password</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <EditProfileDetails onClose={onClose} />
                            </TabPanel>
                            <TabPanel>
                                <EditProfilePassword onClose={onClose} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </DrawerContent>


            </Drawer>
        </>
    )
}