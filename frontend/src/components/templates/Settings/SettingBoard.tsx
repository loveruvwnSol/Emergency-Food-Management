import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import UserSetting from '../../organisms/Settings/UserSettings';
import SettingSidebar from '../../organisms/Settings/SettingSidebar';
import NotificationSettings from '../../organisms/Settings/NotificationSettings';

const SettingBoard = () => {
  const [isToggle, setIsToggle] = useState(true);

  return (
    <Box display={'flex'}>
      <SettingSidebar
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      />
      {isToggle ? <UserSetting /> : <NotificationSettings />}
    </Box>
  );
};

export default SettingBoard;
