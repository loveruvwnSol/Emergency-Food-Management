import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import UserSetting from '../../organisms/setting/UserSetting';
import NotificationSetting from '../../organisms/setting/NotificationSetting';
import SettingSidebar from '../../organisms/setting/SettingSidebar';

const SettingBoard = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <Box display={'flex'}>
      <SettingSidebar
        toggle={toggle}
        setToggle={setToggle}
      />
      {toggle ? <UserSetting /> : <NotificationSetting />}
    </Box>
  );
};

export default SettingBoard;
