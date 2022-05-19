import { Button, DrawerBody, DrawerFooter, Stack } from "@chakra-ui/react"
import React, { useRef } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FormField } from "../forms/FormField"
import InputField from "../forms/Input"
// import { useAuth } from "../../context/AuthContext";
import { EditUserPasswordProps } from "../../context/AuthTypes"
import { editUserPassword } from "../../redux/userActions"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"

type Props = {
  onClose: () => void
}

export const EditProfilePassword = ({ onClose }: Props) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const methods = useForm<EditUserPasswordProps>({ mode: "onBlur" })

  const {
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = methods
  const password = useRef({})

  password.current = watch("passwordNew", "")

  const onSubmit: SubmitHandler<EditUserPasswordProps> = async (data) => {
    const body = {
      passwordCurrent: data.passwordCurrent,
      passwordNew: data.passwordNew,
      passwordNewConfirm: data.passwordNewConfirm
    }
    dispatch(editUserPassword(body))
    onClose()
  }

  return (
    <>
      <DrawerBody py="10">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack spacing="24px">
              <FormField
                as={InputField}
                name="passwordCurrent"
                labeltitle="Current Password"
                defaultValue=""
                type="password"
                rules={{
                  required: "Required"
                }}
                errors={errors.passwordCurrent}
              />
              <FormField
                as={InputField}
                name="passwordNew"
                labeltitle="New Password"
                defaultValue=""
                type="password"
                rules={{
                  required: "Required",
                  pattern: {
                    value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message: "Password must be at least 8 characters long, have at least one uppercase letter and one numeric character"
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be between 8 and 50 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Password must be between 8 and 50 characters"
                  }
                }}
                errors={errors.passwordNew}
              />
              <FormField
                as={InputField}
                name="passwordNewConfirm"
                labeltitle="Confirm Password"
                defaultValue=""
                type="password"
                rules={{
                  required: "Required",
                  validate: (value) => value === password.current || "The passwords do not match"
                }}
                errors={errors.passwordNewConfirm}
              />
            </Stack>
          </form>
        </FormProvider>
      </DrawerBody>

      <DrawerFooter borderTopWidth="1px">
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!isDirty || !isValid} type="submit" colorScheme="blue" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </DrawerFooter>
    </>
  )
}
