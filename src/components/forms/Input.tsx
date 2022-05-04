import { Button, Container, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import React from 'react'

type InputProps = {
    labeltitle?: string | undefined,
    id: string | undefined,
    type?: string,
    disabled?: boolean
    name: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div>
            <FormLabel htmlFor={props.name}>{props.labeltitle}</FormLabel>
            <Input ref={ref} {...props} />
        </div >
    )
})

export default InputField
InputField.displayName = "Inputfield";