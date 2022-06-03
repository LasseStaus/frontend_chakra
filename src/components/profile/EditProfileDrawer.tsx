import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { FC } from 'react'
import { EditProfileDetails } from './EditProfileDetails'
import { EditProfilePassword } from './EditProfilePassword'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const EditProfileDrawer = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Tabs>
            <TabList pt="5">
              <Tab fontSize="lg" _selected={{ color: '#bb760e', borderColor: 'primary' }}>
                Change personal details
              </Tab>
              <Tab fontSize="lg" _selected={{ color: '#bb760e', borderColor: 'primary' }}>
                Change Password
              </Tab>
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
