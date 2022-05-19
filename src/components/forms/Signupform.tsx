import { Box, Button, Container } from "@chakra-ui/react"
import React, { useRef } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { SignupProps } from "../../context/AuthTypes"
import { signupThunk } from "../../redux/authenticationSlice"
import { FormField } from "./FormField"
import { InputField } from "./Input"

const SignupForm = () => {
  const methods = useForm<SignupProps>({ mode: "onChange" })
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty }
  } = methods
  const password = useRef({})

  password.current = watch("password", "")

  const dispatch = useDispatch<any>()
  const messageForUser = useSelector((state: any) => state.user.signupMessageForUser)
  const onSubmit: SubmitHandler<SignupProps> = async (data) => {
    dispatch(signupThunk(data))
  }

  return (
    <>
      <Container maxW={"container.sm"}>
        {messageForUser && <Box>{messageForUser} </Box>}
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormField
              as={InputField}
              name="firstname"
              labeltitle="First Name"
              defaultValue=""
              rules={{
                required: "Required",
                minLength: {
                  value: 2,
                  message: "First name must be a minimum of 2 characters"
                }
              }}
              errors={errors.firstname}
            />
            <FormField
              as={InputField}
              name="lastname"
              labeltitle="Last Name"
              defaultValue=""
              rules={{
                required: "Required",
                minLength: {
                  value: 2,
                  message: "Last name must be a minimum of 2 characters"
                }
              }}
              errors={errors.lastname}
            />
            <FormField
              as={InputField}
              name="email"
              labeltitle="Email"
              defaultValue=""
              rules={{
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              errors={errors.email}
            />
            <FormField
              as={InputField}
              name="phonenumber"
              labeltitle="Phonenumber"
              defaultValue=""
              rules={{
                required: "Required",
                pattern: {
                  value: /^[1-9]\d{7}$/,
                  message: "Phone number cannot start with a 0, and must be 8 digits"
                }
              }}
              errors={errors.phonenumber}
            />
            <FormField
              as={InputField}
              name="password"
              labeltitle="Password"
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
              errors={errors.password}
            />
            <FormField
              as={InputField}
              name="passwordConfirm"
              labeltitle="Confirm Password"
              defaultValue=""
              type="password"
              rules={{
                required: "Required",
                validate: (value) => value === password.current || "The passwords do not match"
              }}
              errors={errors.passwordConfirm}
            />
            <Button variant="primary" disabled={!isDirty || !isValid} mt={4} type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </form>
        </FormProvider>
      </Container>
    </>
  )
}

export default SignupForm
