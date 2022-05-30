import { Box, Button, Container, Flex, Grid, GridItem, Heading, Text, useDisclosure, Wrap } from '@chakra-ui/react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { EditProfileDrawer } from './EditProfileDrawer'

import { SettingsIcon } from '@chakra-ui/icons'
import { formatDate } from '../helpers/formatSingleDate'

type Props = {
  onOpenTicket: () => void
  onBookingOpen: () => void
}

type ListItemProps = {
  heading: string
  body: string
}

const ListItem = ({ heading, body }: ListItemProps) => {
  return (
    <Wrap direction="column" maxW={{ base: '20', md: '40' }}>
      <Heading fontWeight="bold" color="white" fontSize="md" textTransform="uppercase">
        {heading}
      </Heading>
      <Text color="white" textTransform="uppercase" fontSize="xs">
        {body}
      </Text>
    </Wrap>
  )
}

export const ProfileBanner = ({ onOpenTicket, onBookingOpen }: Props) => {
  const { isOpen, onOpen: onOpenProfile, onClose } = useDisclosure()

  const { firstname, lastname } = useSelector((state: any) => state.user.user)
  const bookingData = useSelector((state: any) => state.user.bookings)
  const { activeTickets } = useSelector((state: any) => state.user.tickets)
  const purchaseData = useSelector((state: any) => state.user.purchases)
  const amountOfBookings = bookingData.length

  return (
    <>
      <EditProfileDrawer isOpen={isOpen} onClose={onClose} />

      <Box position={'relative'}>
        <Box
          backgroundImage="url('/wood3.png')"
          backgroundRepeat={'no-repeat'}
          backgroundSize="cover"
          position={'absolute'}
          height="100%"
          width={'100%'}
          backgroundPosition={'center'}
          filter={'brightness(0.5)'}
          zIndex={'1'}
        />
        <Box zIndex={'10'}>
          <Container zIndex={3} maxW="container.lg" marginTop={0} centerContent>
            <Grid
              maxW="100%"
              zIndex={'10'}
              templateRows="repeat(3, 1fr)"
              templateColumns="repeat(5, 1fr)"
              columnGap={{ base: 4, md: 20 }}
              rowGap={{ base: 8, md: 2 }}
              justifyContent="center"
            >
              <GridItem
                rowSpan={{ base: 1, md: 2 }}
                colSpan={1}
                bg="white"
                border={'orange'}
                borderStyle={'solid'}
                borderColor="primary"
                borderWidth={4}
                borderRadius="full"
                alignSelf="center"
                justifySelf="center"
                p="4"
              >
                <Box boxSize={{ base: '20', md: '200px' }}>
                  <Image src="/lillelogo.png" alt="me" width="50" height="45" layout="responsive" />
                </Box>
              </GridItem>

              <GridItem colSpan={{ base: 4, md: 4 }} alignSelf="center">
                <Flex justifyContent="start" direction={{ base: 'column', md: 'row' }} alignItems="center" gap={{ base: '2', md: '8' }}>
                  <Heading fontWeight="bold" color="white" fontSize={{ base: 'xl', lg: '3xl' }} textTransform="uppercase">
                    {firstname} {lastname}
                  </Heading>
                  <Button w="40" ml={'auto'} variant="secondary" size="sm" onClick={onOpenProfile}>
                    Edit profile
                    <SettingsIcon ml={4} />
                  </Button>
                </Flex>
              </GridItem>

              <GridItem colSpan={{ base: 5, md: 4 }} rowSpan={1}>
                <Flex justifyContent={{ base: 'space-around', md: 'space-between' }} w="full">
                  <ListItem
                    heading="Upcomming Bookings"
                    body={amountOfBookings > 0 ? amountOfBookings + ' ' + 'bookings' : 'No bookings ahead'}
                  />
                  <ListItem heading="Tickets" body={activeTickets + 'tickets'} />
                  <ListItem heading="Latest Purchase" body={purchaseData[0] ? formatDate(purchaseData[0]?.purchasedAt) : 'No purchases'} />
                </Flex>
              </GridItem>

              <GridItem colSpan={5} alignSelf={{ base: 'center', md: 'end' }}>
                <Flex w="full" justify={{ base: 'center', md: 'end' }} gap="2">
                  <Button onClick={onBookingOpen} w={{ base: 'full', md: '40' }}>
                    New Booking
                  </Button>
                  <Button onClick={onOpenTicket} w={{ base: 'full', md: '40' }} variant="secondary">
                    Buy tickets
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}
