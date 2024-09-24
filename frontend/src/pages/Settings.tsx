import { Box } from '@chakra-ui/react';
import Header from '../components/organisms/base/Header';
import SidebarItems from '../components/organisms/base/SidebarItems';
import SettingBoard from '../components/templates/Settings/SettingBoard';

const Settings = () => {
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

export default Settings;
