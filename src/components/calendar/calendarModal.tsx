import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text
} from '@chakra-ui/react'
import { useSteps } from 'chakra-ui-steps'
import { FC } from 'react'
import StepFlow from '../stepFlow/stepFlow'

type Props = {
  param?: string
  isOpen: boolean
  onClose: () => void
}
const CalendarModal: FC<Props> = ({ isOpen, onClose }, param) => {
  return (
    <>
      <Modal size={'5xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent padding={4}>
          <ModalHeader textAlign={'center'}>Tidsbestilling i værkstedet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StepFlow />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CalendarModal
