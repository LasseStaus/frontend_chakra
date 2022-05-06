import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import Image from 'next/image'


export default function Logo(props: any) {
    return (
        <Flex alignItems='center' {...props}>
            <Image src="/stortLogo.png" alt="me" width="200" height="90" />
        </Flex>
    )
}