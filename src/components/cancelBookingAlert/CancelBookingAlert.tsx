import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { deleteBooking } from '../../redux/userActions'
import { Booking } from '../../redux/userSlice'
import { formatDate } from '../helpers/formatSingleDate'

type Props = {
  param?: string
  booking: Booking | undefined
  isCancelBookingOpen: boolean
  onCancelBookingClose: () => void
}
export default function CancelBookingAlert({ booking, isCancelBookingOpen, onCancelBookingClose }: Props) {
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  function handleDeleteBooking(booking: Booking) {
    dispatch(deleteBooking(booking))
    onCancelBookingClose()
  }

  if (!booking) return null

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
            You are about to cancel your booking <Text fontWeight="bold"> {formatDate(booking.bookedFor)} </Text> Are you sure you want to
            cancel you booking
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onCancelBookingClose}>Cancel</Button>
            <Button variant="secondary" colorScheme="red" ml={3} onClick={() => handleDeleteBooking(booking)}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
