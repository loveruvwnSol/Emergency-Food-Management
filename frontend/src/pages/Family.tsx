import { useState } from 'react';
import Header from '../components/organisms/base/Header';
import { Box, Text } from '@chakra-ui/react';
import SidebarItems from '../components/molecules/SidebarItems';
import FamilyContents from '../components/templates/Family/FamilyContents';
import InviteFamilyBtn from '../components/atoms/InviteFamilyBtn';

const Family = () => {
  const [familyCheck, setFamilyCheck] = useState(true); //trueで家族ページfalseで家族招待ページ
  return (
    <>
      <Header />
      {familyCheck ? (
        <Box
          display={'flex'}
          alignItems={'start'}
        >
          <SidebarItems />
          <FamilyContents />
        </Box>
      ) : (
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
      )}
    </>
  );
};

export default Family;
