import { Box, Divider, Icon, PopoverBody, PopoverContent } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../../hooks/user';

const HeaderPopover = () => {
  const [{ Logout }] = useUser();

  return (
    <PopoverContent
      w={180}
      _focus={{ boxShadow: 'none' }}
    >
      <PopoverBody
        w={'100%'}
        p={0}
      >
        <NavLink to={'/settings'}>
          <Box
            w={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'end'}
            alignItems='end'
            _hover={{ bgColor: '#f0f0f0' }}
          >
            <Box
              h={'45px'}
              w={'90%'}
              display='flex'
              alignItems='center'
              justifyContent='start'
              gap={3}
              cursor={'pointer'}
            >
              <Icon
                as={AiOutlineUser}
                boxSize={'24px'}
                color={'#808080'}
              />
              <Box fontWeight={'regular'}>ユーザー設定</Box>
            </Box>
          </Box>
        </NavLink>
        <Divider />
        <Box
          w={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'end'}
          alignItems='end'
          _hover={{ bgColor: '#f0f0f0' }}
          onClick={Logout}
        >
          <Box
            h={'45px'}
            w={'90%'}
            display='flex'
            alignItems='center'
            justifyContent='start'
            gap={3}
            cursor={'pointer'}
          >
            <Icon
              as={MdOutlineLogout}
              boxSize={'24px'}
              color={'#808080'}
            />
            <Box fontWeight={'regular'}>ログアウト</Box>
          </Box>
        </Box>
      </PopoverBody>
    </PopoverContent>
  );
};

export default HeaderPopover;
