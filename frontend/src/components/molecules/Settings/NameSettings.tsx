import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

const NameSettings = () => {
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
      <Button
        bgColor={'#FB8B24'}
        _hover={{ bgColor: '#ffa959' }}
        _active={{ bgColor: '#FB8B24' }}
        color={'#fff'}
        borderRadius={'25px'}
        w={'90px'}
        h={'40px'}
      >
        保存
      </Button>
    </Box>
  );
};

export default NameSettings;
