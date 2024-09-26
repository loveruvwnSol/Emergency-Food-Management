import { Box, Icon, Text } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

type UserTabProps = {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserTab: React.FC<UserTabProps> = ({ isToggle, setIsToggle }) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={5}
      cursor={'pointer'}
      w={'314px'}
      h={'45px'}
      borderRadius={'10px'}
      _hover={{ bgColor: '#f0f0f0' }}
      position={'relative'}
      onClick={() => {
        setIsToggle(true);
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={8}
      >
        <Icon
          as={AiOutlineUser}
          boxSize={'24px'}
          color={'#808080'}
          ml={2}
        />
        <Text
          fontSize={'16px'}
          fontWeight={isToggle ? 'bold' : ''}
          w={'180px'}
        >
          ユーザー設定
        </Text>
      </Box>
      <Box>
        <Icon
          as={IoIosArrowForward}
          boxSize={'22px'}
          mt={1.5}
          mr={18}
          color={'#808080'}
        />
      </Box>
      {isToggle ? (
        <Box
          w={1}
          h={35}
          mr={0.3}
          bgColor={'#FB8B24'}
          borderRadius={'10px'}
        ></Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default UserTab;
