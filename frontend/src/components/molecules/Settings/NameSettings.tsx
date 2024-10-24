import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUser } from '../../../hooks/user';

const NameSettings = () => {
  const [{ user, UpdateUsername }] = useUser();
  const [userName, setUserName] = useState('');
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (user?.name === userName || userName === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userName]);

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  if (!user) return <Text>loading...</Text>;

  const handleSave = async () => {
    await UpdateUsername(userName);
  };

  return (
    <Box
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
        placeholder={user.name}
        w={'280px'}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        focusBorderColor='#FB8B24'
      />
      <Button
        bgColor={'#FB8B24'}
        _hover={{ bgColor: '#ffa959' }}
        _active={{ bgColor: '#FB8B24' }}
        color={'#fff'}
        borderRadius={'25px'}
        w={'90px'}
        h={'40px'}
        onClick={handleSave}
        isDisabled={disabled}
      >
        保存
      </Button>
    </Box>
  );
};

export default NameSettings;
