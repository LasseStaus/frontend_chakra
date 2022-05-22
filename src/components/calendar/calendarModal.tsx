import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { FC } from 'react'
import StepFlow from '../bookingFlow/stepFlow'

type Props = {
  isOpen: boolean
  onClose: () => void
}
const CalendarModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size={'5xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent pt={0}>
          {/*           <ModalCloseButton />
           */}
          <ModalBody p={0}>
            <StepFlow />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CalendarModal
