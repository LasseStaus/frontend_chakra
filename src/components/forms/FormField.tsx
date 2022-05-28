import { Controller, ControllerProps, FieldError, FieldPath, FieldValues, useFormContext, UseFormStateReturn } from 'react-hook-form'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form/dist/types/controller'
import React from 'react'
import { InputField } from './Input'
import { Box, FormControl, FormErrorMessage, Text } from '@chakra-ui/react'

type FormFieldBase = {
  as?: React.ElementType
  labeltitle?: string
  id?: string
}

type FieldErrorContainerProps = {
  fieldState: ControllerFieldState
}

//Error comp for formfield
const FieldError: React.FC<FieldErrorContainerProps> = ({ fieldState }) => {
  if (!fieldState?.error && !fieldState?.error?.message) return null
  return (
    <>
      <Box>
        <FormErrorMessage>{fieldState?.error?.message && fieldState?.error.message}</FormErrorMessage>
      </Box>
    </>
  )
}

type RenderFormFieldProps = FormFieldBase & {
  field: ControllerRenderProps
  fieldState: ControllerFieldState
  type?: string
  disabled?: boolean
}

// Component to be rendered containg Chakra UI Input for preperation of the integration with react-hook-form
const RenderFormField: React.FC<RenderFormFieldProps> = ({ as: Component, id, field, labeltitle, type, disabled }) => {
  switch (
    Component // for scalability if more cases of components where added like checkbox or textfield
  ) {
    case InputField:
      return (
        <Box>
          <InputField {...field} id={id} labeltitle={labeltitle} type={type} disabled={disabled} />
        </Box>
      )
    // case TextField: // example
    //   return (
    //     <Box>
    //       <TextField {...field} id={id} labeltitle={labeltitle} type={type} disabled={disabled} />
    //     </Box>
    //   )
  }

  return null
}

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps, 'name' | 'render'> &
  FormFieldBase & {
    name: string
    disabled?: boolean
    type?: string
    errors: FieldError | undefined
    render?: ({
      field,
      fieldState,
      formState
    }: {
      field: ControllerRenderProps<TFieldValues, TName>
      fieldState: ControllerFieldState
      formState: UseFormStateReturn<TFieldValues>
    }) => React.ReactElement
  }

//Streamline the integration process of Chakra UI RenderFormField with react-hook-form
const FormField: React.FC<FormFieldProps> = ({ as: Component, render, labeltitle, id, errors, type, disabled, ...otherProps }) => {
  const { control } = useFormContext() // control contains methods for registering the field into the Hook

  return (
    <Controller // wrapper for integration
      {...otherProps}
      control={control}
      render={(data) =>
        render ? ( // If render prop is defined then render react component and FieldError comp
          <>
            {render(data)}
            <FieldError fieldState={data.fieldState} />
          </>
        ) : Component ? ( // If Component prop is defined then use RenderFormField comp and FieldError comp
          <Box mb="5">
            <FormControl isInvalid={errors ? true : false}>
              <RenderFormField
                id={id}
                as={Component}
                // {...field} provides onChange, onBlur, name, ref and value to the inputField component
                field={data.field}
                // {...fieldState} contains specific the state of the input: invalid, isTouched, isDirty, error
                fieldState={data.fieldState}
                labeltitle={labeltitle}
                type={type}
                disabled={disabled}
              />
              <FieldError fieldState={data.fieldState} />
            </FormControl>
          </Box>
        ) : (
          <></>
        )
      }
    />
  )
}

export { FormField }
