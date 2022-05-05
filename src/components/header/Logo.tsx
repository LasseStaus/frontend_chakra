import React from "react"
import { Box, Text } from "@chakra-ui/react"
import Image from 'next/image'


export default function Logo(props: any) {
    return (
        <Box {...props}>
            <Image src="/lillelogo.png" alt="me" width="90" height="90" />
        </Box>
    )
}