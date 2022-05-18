import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { bookingData, useBooking } from '../../context/bookingContext'

type Props = {
  param?: string
  booking: bookingData | undefined
  isCancelBookingOpen: boolean
  onCancelBookingClose: () => void
}
export default function CancelBookingAlert({ booking, isCancelBookingOpen, onCancelBookingClose }: Props) {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

  const { deleteBooking } = useBooking()
  console.log(booking)

  console.log('date', booking?.createdAt, typeof booking?.createdAt)

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        onClose={onCancelBookingClose}
        isOpen={isCancelBookingOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you {booking?.userId} {booking?.createdAt} want to discard all of your notes? 44 words will be deleted.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onCancelBookingClose}>No</Button>
            <Button colorScheme="red" ml={3} onClick={(e) => deleteBooking(booking)}></Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
