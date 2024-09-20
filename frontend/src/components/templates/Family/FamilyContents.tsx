import { GoPeople } from 'react-icons/go';
import DataBoard from '../../molecules/Family/DataBoard';
import { Box, Icon, Text, useDisclosure } from '@chakra-ui/react';
import FamilyMemberModal from '../../organisms/Family/FamilyMemberModal';

const FamilyContents = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={8}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          w={'1160px'}
        >
          <Text
            fontSize={'28px'}
            fontWeight={'bold'}
          >
            備蓄目標
          </Text>
          <Icon //家族メンバー一覧を開くアイコン
            as={GoPeople}
            boxSize={'32px'}
            cursor={'pointer'}
            onClick={onOpen}
          />
        </Box>
        <Box
          mt={'24px'}
          display={'flex'}
          gap={40}
        >
          <DataBoard
            Type='食料'
            Goal={12}
            Now={12}
            GoodFood={15}
            BadFood={15}
            bg='#FB8B24'
          />
          <DataBoard
            Type='飲料'
            Goal={12}
            Now={12}
            GoodFood={15}
            BadFood={15}
            bg='#00C2FF'
          />
        </Box>
      </Box>
      <FamilyMemberModal
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};

export default FamilyContents;
