import { Box } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/organisms/base/Header';
import SidebarItems from '../components/organisms/base/SidebarItems';
import SettingBoard from '../components/templates/Setting/SettingBoard';

const Setting = () => {
  return (
    <Box>
      <Header />
      <Box display={'flex'}>
        <SidebarItems />
        <SettingBoard />
      </Box>
    </Box>
  );
};

export default Setting;
