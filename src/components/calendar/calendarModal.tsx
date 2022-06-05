import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue
} from '@chakra-ui/react'
import { FC } from 'react'
import StepFlow from '../bookingFlow/stepFlow'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CalendarModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size={'5xl'} onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'dCord4')}>
          <ModalHeader>Book dates</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StepFlow />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default CalendarModal
