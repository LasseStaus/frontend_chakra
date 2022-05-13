import { Box, Button, ButtonGroup, Container, Flex, Grid, GridItem, Heading, Spacer, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import Image from 'next/image'
import { useContext, useReducer } from "react";
import DashboardContext from "../../context/dashboard/dashboard_context";
// import UserContext, { UserProvider } from "../../context/dashboard/dashboard_context";
// import { initialState, userReducer } from "../../context/dashboard/dashboard_reducer";
import { UserDetails } from "../../pages";
import { EditProfile } from "./EditProfile";

const AvatarProfilePicture = () => {
    <Box bg="darkgray" borderRadius="100" p="6" mr="5">
        <Image src="/lillelogo.png" alt="me" width="50" height="40" />
    </Box>

}

export function ProfileBanner({ data }: UserDetails) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    // const { firstname, lastname, phonenumber, email } = data
    const { loggedInUser } = useContext(DashboardContext);
    // const [state, dispatch] = useReducer(userReducer, initialState.loggedInUser);

    console.log("REDUCER dataen loggedin", loggedInUser);

    if (loggedInUser) { console.log("USER DATA NAMES", loggedInUser.firstname, loggedInUser.lastname) }
    //const { firstname, lastname, email } = loggedInUser


    return (
        <>
            <EditProfile isOpen={isOpen} onClose={onClose} />
            <Container bg="lightgrey" maxW='xxl' centerContent>
                <Grid
                    maxW="70%"
                    templateRows='repeat(3, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    columnGap={{ base: 4, md: 20 }}
                    rowGap={{ base: 8, md: 2 }}
                    justifyContent="center"
                >
                    <GridItem rowSpan={{ base: 1, md: 2 }} colSpan={1} bg="darkgray" borderRadius="full" alignSelf="center" justifySelf="center" p="4">
                        <Box boxSize={{ base: "20", md: "40" }}>
                            <Image src="/lillelogo.png" alt="me" width="50" height="45" layout="responsive" />
                        </Box>
                    </GridItem>

                    <GridItem colSpan={{ base: 4, md: 4 }} alignSelf="center">
                        <Flex justifyContent="start" direction={{ base: 'column', md: 'row' }} alignItems='center' gap={{ base: "2", md: "8" }}>
                            <Heading fontSize={{ base: "sm", md: "xl", lg: "3xl" }}>TEST</Heading>
                            <Button w="40" variant="secondary" size="sm" onClick={onOpen}>Rediger Profil</Button>
                        </Flex>
                    </GridItem>

                    <GridItem colSpan={{ base: 5, md: 4 }} rowSpan={1}>
                        <Flex justifyContent="space-between" w="full"> {/* // TO DO - mapping */}
                            <Wrap direction='column' maxW={20}>
                                <Heading fontSize='xs' textTransform='uppercase'>Kommende bookinger</Heading>
                                <Text textTransform='uppercase' fontSize='xs'>INGEN KOMMENDE BOOKINGER</Text>
                            </Wrap>
                            <Wrap direction='column' maxW={20}>
                                <Heading fontSize='xs' textTransform='uppercase'>KLIPPEKORT</Heading>
                                <Text textTransform='uppercase' fontSize='xs'>10 KLIP</Text>
                            </Wrap>
                            <Wrap direction='column' maxW={20}>
                                <Heading fontSize='xs' textTransform='uppercase'> Seneste besøg</Heading>
                                <Text textTransform='uppercase' fontSize='xs'>D. 31. april 2022</Text>
                            </Wrap>
                        </Flex>
                    </GridItem>

                    <GridItem colSpan={5} alignSelf={{ base: "center", md: "end" }}>
                        <Flex w="full" justify={{ base: 'center', md: 'end' }} gap='2'>
                            <Button w={{ base: 'full', md: '40' }}>Book Plads</Button>
                            <Button w={{ base: 'full', md: '40' }} variant="secondary">Køb billet</Button>
                        </Flex>
                    </GridItem>
                </Grid >
            </Container >
        </>

    )
}