import { Box, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

const NameSetting = () => {
  const [userName, setUserName] = useState('鈴木太郎');

  return (
    <Box //名前設定
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={8}
      w={'100%'}
    >
      <Text
        fontSize={'20px'}
        fontWeight={'semibold'}
      >
        名前
      </Text>
      <Input
        placeholder={userName}
        w={'280px'}
        onChange={(e) => setUserName(e.target.value)}
      />
    </Box>
  );
};

export default NameSetting;
