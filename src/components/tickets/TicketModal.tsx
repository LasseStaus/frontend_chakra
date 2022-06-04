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
import StepFlowTicket from './stepFlowTicket/stepFlow'

type Props = {
  isOpen: boolean
  onClose: () => void
}
const TicketModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal size={'5xl'} onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue('white', 'dCord4')}>
          <ModalHeader>Buy tickets</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StepFlowTicket />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}

export default TicketModal
