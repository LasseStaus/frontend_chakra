import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text } from '@chakra-ui/react'
import { useSteps } from 'chakra-ui-steps'
import { FC } from 'react'
import StepFlow from '../stepFlow/stepFlow'
import StepFlowTicket from './stepFlowTicket/stepFlow'

type Props = {
  param?: string
  isOpen: boolean
  onClose: () => void
}
const TicketModal: FC<Props> = ({ isOpen, onClose }, param) => {
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
