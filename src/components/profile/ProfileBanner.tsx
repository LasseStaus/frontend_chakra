import { Box, Button, ButtonGroup, Flex, Heading, Text, Wrap } from "@chakra-ui/react";
import Image from 'next/image'


export function ProfileBanner() {
    return (
        <>
            <Flex direction='column' alignItems='center' rowGap={10}>
                <Flex alignItems='center' justifyContent='center'>
                    <Box>
                        <Image src="/lillelogo.png" alt="me" width="100" height="100" />
                    </Box>

                    <Flex direction='column' alignItems='start' justifyContent='center'>
                        <Heading>LASSE STAUSGAARD</Heading>
                        <Button>Rediger Profil</Button>

                    </Flex>
                </Flex>

                <Flex justifyContent='space-evenly' w="full"> {/* // TO DO - mapping */}
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
                <Flex w="full" justifyContent='center' gap='2'>
                    <Button>Book Plads</Button>
                    <Button>Køb billet</Button>
                </Flex>
            </Flex>
            {/* <Flex minWidth='full' alignItems='center' justifyContent='center'>
                <Box>
                    <Image src="/lillelogo.png" alt="me" width="90" height="90" />
                </Box>

                <Box>
                    <Flex>
                        <Heading>LASSE STAUSGAARD</Heading>
                        <Button>Rediger Profil</Button>

                    </Flex>

                    <Flex>
                        <Box>
                            <Heading>Kommende bookinger</Heading>
                            <Text>INGEN KOMMENDE BOOKINGER</Text>
                        </Box>
                        <Box>
                            <Heading>KLIPPEKORT</Heading>
                            <Text>10 KLIP</Text>
                        </Box>
                        <Box>
                            <Heading>Seneste besøg</Heading>
                            <Text>D. 31. april 2022</Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex> */}
        </>
    )
}