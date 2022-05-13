import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../forms/FormField";
import InputField from "../forms/Input";
import { EditProfileDetails } from "./EditProfileDetails";
import { EditProfilePassword } from "./EditProfilePassword";

type Props = {
    isOpen: boolean
    onClose: () => void
    data: any
}

export const EditProfileDrawer: FC<any> = ({ isOpen, onClose }: Props) => {

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