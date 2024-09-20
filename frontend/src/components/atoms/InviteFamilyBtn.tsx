import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddFamily from '../organisms/Family/InviteFamilyModal';

const InviteFamilyBtn = () => {
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();
  return (
    <>
      <Button
        color={'#fff'}
        bgColor={'#FB8B24'}
        w={'180px'}
        h={'60px'}
        borderRadius={'25px'}
        border={'none'}
        fontSize={'16px'}
        fontWeight={'bold'}
        cursor={'pointer'}
        _hover={{ bgColor: '#ffa959' }}
        onClick={onSecondModalOpen}
      >
        家族に招待
      </Button>
      <AddFamily
        isSecondModalOpen={isSecondModalOpen}
        onSecondModalClose={onSecondModalClose}
      />
    </>
  );
};

export default InviteFamilyBtn;
