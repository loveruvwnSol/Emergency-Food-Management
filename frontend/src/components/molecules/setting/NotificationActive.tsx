import { Box, Icon, Text } from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import { FiBell } from 'react-icons/fi';

type NotificationActiveProps = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationActive: React.FC<NotificationActiveProps> = ({ toggle, setToggle }) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mt={5}
      cursor={'pointer'}
      w={'314'}
      h={'45px'}
      borderRadius={'10px'}
      _hover={{ bgColor: '#f0f0f0' }}
      position={'relative'}
      onClick={() => {
        setToggle(false);
      }}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={8}
      >
        <Icon
          as={FiBell}
          boxSize={'24px'}
          color={'#808080'}
          ml={2}
        />
        <Text
          fontSize={'16px'}
          fontWeight={'bold'}
          w={'180px'}
        >
          通知設定
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
      {toggle ? (
        ''
      ) : (
        <Box
          w={1}
          h={35}
          mr={0.3}
          bgColor={'#FB8B24'}
          borderRadius={'10px'}
        ></Box>
      )}
    </Box>
  );
};

export default NotificationActive;
