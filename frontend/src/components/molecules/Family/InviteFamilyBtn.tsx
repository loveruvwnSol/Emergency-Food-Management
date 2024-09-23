import { Button, useDisclosure } from '@chakra-ui/react';
import AddFamily from '../../organisms/Family/InviteFamilyModal';

const InviteFamilyBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        onClick={onOpen}
      >
        家族に招待
      </Button>
      <AddFamily
        isSecondModalOpen={isOpen}
        onSecondModalClose={onClose}
      />
    </>
  );
};

export default InviteFamilyBtn;
