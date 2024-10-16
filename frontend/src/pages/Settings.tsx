import { Box } from '@chakra-ui/react';
import Header from '../components/organisms/Base/Header';
import SidebarItems from '../components/organisms/Base/SidebarItems';
import SettingBoard from '../components/templates/Settings/SettingBoard';

const Settings = () => {
  return (
    <Box>
      <Header title={"設定"}/>
      <Box display={'flex'}>
        <SidebarItems />
        <SettingBoard />
      </Box>
    </Box>
  );
};

export default Settings;
