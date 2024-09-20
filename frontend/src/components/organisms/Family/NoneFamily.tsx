import { Box, Text } from '@chakra-ui/react';
import Header from '../base/Header';
import InviteFamilyBtn from '../../atoms/InviteFamilyBtn';
import SidebarItems from '../../molecules/SidebarItems';

const NoneFamily = () => {
  return (
    <>
      <Box>
        <Header />
        <Box display={'flex'}>
          <SidebarItems />
          <Box
            w={'1100px'}
            h={'100vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            pb={'60px'}
          >
            <Text
              fontSize={'36px'}
              fontWeight={'bold'}
              mb={'48px'}
            >
              家族がいません
            </Text>
            <InviteFamilyBtn />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NoneFamily;
