import { Box, Button, Container, Flex, Grid, GridItem, Heading, Text, useDisclosure, Wrap } from '@chakra-ui/react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { EditProfileDrawer } from './EditProfileDrawer'

import { SettingsIcon } from '@chakra-ui/icons'

export const ProfileBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
                <Box boxSize={{ base: '20', md: '40' }}>
                  <Image src="/lillelogo.png" alt="me" width="50" height="45" layout="responsive" />
                </Box>
              </GridItem>

              <GridItem colSpan={{ base: 4, md: 4 }} alignSelf="center">
                <Flex justifyContent="start" direction={{ base: 'column', md: 'row' }} alignItems="center" gap={{ base: '2', md: '8' }}>
                  <Heading fontSize={{ base: 'sm', md: 'xl', lg: '3xl' }}>
                    {firstname} {lastname}
                  </Heading>
                  <Button w="40" ml={'auto'} variant="secondary" size="sm" onClick={onOpen}>
                    Rediger Profil
                    <SettingsIcon ml={4} />
                  </Button>
                </Flex>
              </GridItem>

              <GridItem colSpan={{ base: 5, md: 4 }} rowSpan={1}>
                <Flex justifyContent="space-between" w="full">
                  {/* // TO DO - mapping */}
                  <Wrap direction="column" maxW={20}>
                    <Heading fontSize="xs" textTransform="uppercase">
                      Upcomming Bookings
                    </Heading>

                    <Text textTransform="uppercase" fontSize="xs">
                      {amountOfBookings > 0 ? amountOfBookings + ' ' + 'bookings' : 'No bookings ahead'}
                    </Text>
                  </Wrap>
                  <Wrap direction="column" maxW={20}>
                    <Heading fontSize="xs" textTransform="uppercase">
                      Tickets
                    </Heading>
                    <Text textTransform="uppercase" fontSize="xs" color={'primary'}>
                      {activeTickets} tickets
                    </Text>
                  </Wrap>
                  <Wrap direction="column" maxW={20}>
                    <Heading fontSize="xs" textTransform="uppercase">
                      Latest Purchase
                    </Heading>
                    <Text textTransform="uppercase" fontSize="xs">
                      {purchaseData[0] ? purchaseData[0]?.purchasedAt : 'No purchases'}
                    </Text>
                  </Wrap>
                </Flex>
              </GridItem>

              <GridItem colSpan={5} alignSelf={{ base: 'center', md: 'end' }}>
                <Flex w="full" justify={{ base: 'center', md: 'end' }} gap="2">
                  <Button w={{ base: 'full', md: '40' }}>Book Plads</Button>
                  <Button w={{ base: 'full', md: '40' }} variant="secondary">
                    Køb billet
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
