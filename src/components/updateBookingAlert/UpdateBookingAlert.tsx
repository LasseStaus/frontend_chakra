import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast
} from '@chakra-ui/react'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { updateBookingWithiLOQKey } from '../../redux/userActions'
import { Booking } from '../../redux/userSlice'
import { FormField } from '../forms/FormField'
import InputField from '../forms/Input'

type UpdateBookingProps = {
  iLOQKey: string
}

type Props = {
  param?: string
  booking: Booking | undefined
  isUpdateBookingOpen: boolean
  onUpdateBookingClose: () => void
}
export default function UpdateBookingAlert({ booking, isUpdateBookingOpen, onUpdateBookingClose }: Props) {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const dispatch = useDispatch<AppDispatch>()

  const methods = useForm<UpdateBookingProps>({ mode: 'onChange' })
  //TODO Isvalid & isdirty - do something
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty }
  } = methods
  const errorToast = useToast({
    position: 'bottom-right',
    status: 'success',
    title: 'Success',
    isClosable: true,
    duration: 5000,
    variant: 'solid'
  })

  const onSubmit: SubmitHandler<UpdateBookingProps> = async (data) => {
    const bookingData = { iLOQKey: data.iLOQKey, bookingId: booking?.id }

    dispatch(updateBookingWithiLOQKey(bookingData))
    reset({ iLOQKey: '' })

    onUpdateBookingClose()
    return errorToast({ description: `Key added for ${booking!.bookedFor} ` })
  }

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        onClose={onUpdateBookingClose}
        isOpen={isUpdateBookingOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Assign key ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormProvider {...methods}>
              <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                  as={InputField}
                  name="iLOQKey"
                  labeltitle="iLOQ Key"
                  defaultValue=""
                  rules={{
                    required: 'Required'
                  }}
                  errors={errors.iLOQKey}
                />
              </form>
            </FormProvider>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="secondary" onClick={onUpdateBookingClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
