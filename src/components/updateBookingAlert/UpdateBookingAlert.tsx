import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { updateBookingWithiLOQKey } from '../../redux/userActions'
import { Booking } from '../../redux/userSlice'
import { allUserBookingsData } from '../admin/adminPanel'
import { FormField } from '../forms/FormField'
import InputField from '../forms/Input'

const updateBooking = async (formData: UpdateBookingProps, bookingId: string | undefined) => {
  const res = await fetch(`api/updateBooking`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      formData,
      bookingId
    })
  })

  const data = await res.json()
  console.log(data)

  if (res.ok && data) {
    return data
  } else {
    console.log('wrong')
  }
}

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
  const {
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = methods

  const onSubmit: SubmitHandler<UpdateBookingProps> = async (data) => {
    console.log('i submit', data)

    const bookingData = { iLOQKey: data.iLOQKey, bookingId: booking?.id }

    dispatch(updateBookingWithiLOQKey(bookingData))
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
            </FormProvider>{' '}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onUpdateBookingClose}>No</Button>
            <Button colorScheme="red" ml={3} type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
