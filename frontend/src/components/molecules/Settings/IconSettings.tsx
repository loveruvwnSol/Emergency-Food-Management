import { Box, Icon, Input } from '@chakra-ui/react';
import { useRef } from 'react';
import { IoCameraOutline } from 'react-icons/io5';

const IconSettings = () => {
  const fileInputRef = useRef<any>(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

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
      onClick={() => handleIconClick()}
    >
      <Icon
        as={IoCameraOutline}
        position={'absolute'}
        boxSize={'46px'}
        top={26}
        right={27.5}
      />
      <Input
        type='file'
        ref={fileInputRef}
        display={'none'}
      />
    </Box>
  );
};

export default IconSettings;
