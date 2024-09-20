import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import SerachMemberInput from '../../molecules/Family/SerachMemberInput';
import FamilyMembersBoard from './FamilyMembersBoard';

type AddFmilyProps = {
  isSecondModalOpen: boolean;
  onSecondModalClose: () => void;
};

const AddFamily: React.FC<AddFmilyProps> = ({ isSecondModalOpen, onSecondModalClose }) => {
  return (
    <Modal
      isOpen={isSecondModalOpen}
      onClose={onSecondModalClose}
    >
      <ModalOverlay />
      <ModalContent
        maxW={'1000px'}
        h={'600px'}
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

export default AddFamily;
