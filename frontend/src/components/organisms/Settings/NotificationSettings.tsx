import { Box, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import {
  useNotificationSettings,
  NotificationSettings as NotificationSettingsType,
} from '../../../hooks/notificationSettings'; // カスタムフックのインポート

const NotificationSettings = () => {
  const { notificationSettings, UpdateNotificationSettings } = useNotificationSettings();

  // Switchの状態が変更されたときに呼ばれる関数
  const handleSwitchChange = (setting: keyof NotificationSettingsType) => {
    if (notificationSettings) {
      const updatedSettings = {
        ...notificationSettings,
        [setting]: !notificationSettings[setting], // 現在の値を反転
      };
      UpdateNotificationSettings(updatedSettings); // 更新関数を呼び出す
    }
  };

  if (!notificationSettings) return <Text>loading...</Text>;

  return (
    <Box w={'100%'}>
      <Text
        fontSize={'24px'}
        fontWeight={'bold'}
      >
        通知設定
      </Text>
      <FormControl>
        <Box
          display={'flex'}
          alignItems={'center'}
          mt={'80px'}
        >
          <FormLabel
            htmlFor='limit'
            fontSize={'18px'}
            fontWeight={'semibold'}
          >
            消費期限が近い通知
          </FormLabel>
          <Switch
            id='limit'
            size='lg'
            mb={2}
            colorScheme='orange'
            isChecked={notificationSettings?.is_expiration_warning}
            onChange={() => handleSwitchChange('is_expiration_warning')} // Switchの変更時に関数を呼び出す
          />
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          mt={'30px'}
        >
          <FormLabel
            htmlFor='notenough'
            fontSize={'18px'}
            fontWeight={'semibold'}
          >
            備蓄量が足りない通知
          </FormLabel>
          <Switch
            id='notenough'
            size='lg'
            mb={2}
            colorScheme='orange'
            isChecked={notificationSettings?.is_low_stock_warning}
            onChange={() => handleSwitchChange('is_low_stock_warning')} // Switchの変更時に関数を呼び出す
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default NotificationSettings;
