import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import SerachMemberInput from '../../molecules/Family/SearchMember';
import FamilyMembersBoard from './FamilyMembersBoard';

type InviteFamilyModalProps = {
  isSecondModalOpen: boolean;
  onSecondModalClose: () => void;
};

const InviteFamilyModal: React.FC<InviteFamilyModalProps> = ({
  isSecondModalOpen,
  onSecondModalClose,
}) => {
  return (
    <Modal
      isOpen={isSecondModalOpen}
      onClose={onSecondModalClose}
    >
      <ModalOverlay />
      <ModalContent
        maxW={'1000px'}
        h={'600px'}
        mt={'96px'}
      >
        <ModalHeader
          textAlign={'center'}
          fontSize={'26px'}
          fontWeight={'bold'}
          mt={'8px'}
          mb={'12px'}
        >
          家族を追加しよう！
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SerachMemberInput />
          <FamilyMembersBoard />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InviteFamilyModal;
