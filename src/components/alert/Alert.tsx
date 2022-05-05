import { Alert, AlertIcon, Stack } from "@chakra-ui/react"

const AlertBox = (props: any) => {

    if (!props.status) { return null } else {
        return (
            <Stack spacing={3}>
                <Alert status={props.status}>
                    <AlertIcon />
                    {props.text}
                </Alert>
            </Stack>
        )
    }
}

export default AlertBox