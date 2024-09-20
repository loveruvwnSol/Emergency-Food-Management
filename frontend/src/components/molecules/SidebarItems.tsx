import { Box, Icon, Text } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosList } from 'react-icons/io';
import { MdFamilyRestroom } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';

const SidebarItems = () => {
  return (
    <Box
      mt={10}
      ml={10}
      mr={20}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'9px'}
        cursor={'pointer'}
      >
        <Icon
          as={AiOutlineHome}
          boxSize={'24px'}
        />
        <Text
          fontWeight={'mideum'}
          fontSize={'20px'}
        >
          ホーム
        </Text>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'9px'}
        mt={'40px'}
        cursor={'pointer'}
      >
        <Icon
          as={IoIosList}
          boxSize={'24px'}
        />
        <Text
          fontWeight={'mideum'}
          fontSize={'20px'}
        >
          リスト
        </Text>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'9px'}
        mt={'40px'}
        cursor={'pointer'}
      >
        <Icon
          as={MdFamilyRestroom}
          boxSize={'24px'}
        />
        <Text
          fontWeight={'mideum'}
          fontSize={'20px'}
        >
          家族
        </Text>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'9px'}
        mt={'40px'}
        cursor={'pointer'}
      >
        <Icon
          as={IoSettingsOutline}
          boxSize={'24px'}
        />
        <Text
          fontWeight={'mideum'}
          fontSize={'20px'}
        >
          設定
        </Text>
      </Box>
    </Box>
  );
};

export default SidebarItems;
