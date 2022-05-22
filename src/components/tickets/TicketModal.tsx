import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { FC } from 'react'
import StepFlowTicket from './stepFlowTicket/stepFlow'

type Props = {
  isOpen: boolean
  onClose: () => void
}
const TicketModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size={'6xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StepFlowTicket />
          </ModalBody>
          <ModalFooter>
            <Button>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TicketModal
