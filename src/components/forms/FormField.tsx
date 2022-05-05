import {
    Controller,
    ControllerProps,
    FieldError,
    FieldPath,
    FieldValues,
    useFormContext,
    UseFormStateReturn,
} from "react-hook-form";
import { ControllerFieldState, ControllerRenderProps, } from "react-hook-form/dist/types/controller"
import React from "react";
import { InputField } from "./Input";
import { Box, FormControl, FormErrorMessage, Text } from "@chakra-ui/react";

type FormFieldBase = {
    as?: React.ElementType;
    labeltitle?: string;
    id?: string;
};

type FieldErrorContainerProps = {
    fieldState: ControllerFieldState;
};
const FieldError: React.FC<FieldErrorContainerProps> = ({ fieldState }) => {
    if (!fieldState?.invalid && !fieldState?.error?.message) return null;
    return (
        <>
            <Box
            >
                <FormErrorMessage>
                    {fieldState?.error?.message && fieldState?.error.message}
                </FormErrorMessage>
            </Box>
        </>
    );
};

type RenderFormFieldProps = FormFieldBase & {
    field: ControllerRenderProps;
    fieldState: ControllerFieldState;
    type?: string;
    disabled?: boolean;

};

const RenderFormField: React.FC<RenderFormFieldProps> = ({
    as: Component,
    id,
    field,
    labeltitle,
    fieldState,
    type,
    disabled
}) => {
    switch (Component) {
        case InputField:
            return (
                <Box>
                    <InputField
                        {...field}
                        id={id}
                        labeltitle={labeltitle}
                        type={type}
                        disabled={disabled}
                    // error={!!(fieldState?.error && fieldState?.invalid ? true : undefined)}
                    />
                </Box >
            );
        //         case TextArea:
        // return (
        //     <TextArea
        //         {...field}
        //         placeholder={labeltitle || ""}
        //         error={fieldState?.error && fieldState?.invalid ? true : false}
        //     />
        // );
    }

    return null;
};

export type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    > = Omit<ControllerProps, "name" | "render"> &
    FormFieldBase & {
        name: string;
        disabled?: boolean;
        type?: string;
        errors: FieldError | undefined;
        render?: ({
            field,
            fieldState,
            formState,
        }: {
            field: ControllerRenderProps<TFieldValues, TName>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<TFieldValues>;
        }) => React.ReactElement;
    };

const FormField: React.FC<FormFieldProps> = ({
    as: Component,
    render,
    labeltitle,
    id,
    errors,
    type,
    disabled,
    ...otherProps
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            {...otherProps}
            control={control}
            render={(data) =>
                render ? ( // If render exist then render and show FieldError
                    <>
                        {render(data)}
                        <FieldError fieldState={data.fieldState} />
                    </>
                ) : Component ? ( // If Component is defined then use RenderFormField and show Error
                    <Box mb='5'>
                        <FormControl isInvalid={errors ? true : false}>
                            <RenderFormField
                                id={id}
                                as={Component}
                                field={data.field}
                                labeltitle={labeltitle}
                                fieldState={data.fieldState}
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
    );
};

export { FormField };
