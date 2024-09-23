import { Box, Icon } from '@chakra-ui/react';
import { IoCameraOutline } from 'react-icons/io5';

const IconSetting = () => {
  return (
    <Box //アイコン
      w={'100px'}
      h={'100px'}
      bgColor={'#d3d3d3'}
      borderRadius={'50%'}
      border={'1px solid #000'}
      position={'relative'}
      cursor={'pointer'}
      _hover={{ opacity: '50%' }}
    >
      <Icon
        as={IoCameraOutline}
        position={'absolute'}
        boxSize={'46px'}
        top={26}
        right={27.5}
      />
    </Box>
  );
};

export default IconSetting;
