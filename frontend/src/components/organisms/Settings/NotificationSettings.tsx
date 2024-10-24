import { Box, FormControl, FormLabel, Switch, Text } from "@chakra-ui/react";
import {
  useNotificationSettings,
  NotificationSettings as NotificationSettingsType,
} from "../../../hooks/notificationSettings";

const NotificationSettings = () => {
  const { notificationSettings, UpdateNotificationSettings } =
    useNotificationSettings();

  const handleSwitchChange = (setting: keyof NotificationSettingsType) => {
    if (notificationSettings) {
      const updatedSettings = {
        ...notificationSettings,
        [setting]: !notificationSettings[setting],
      };

      const { user_id, User, ...settingsToUpdate } = updatedSettings;
      UpdateNotificationSettings(settingsToUpdate);
    }
  };

  if (!notificationSettings) return <Text>loading...</Text>;

  return (
    <Box w={"100%"}>
      <Text fontSize={"24px"} fontWeight={"bold"}>
        通知設定
      </Text>
      <FormControl>
        <Box display={"flex"} alignItems={"center"} mt={"80px"}>
          <FormLabel htmlFor="limit" fontSize={"18px"} fontWeight={"semibold"}>
            消費期限が近い通知
          </FormLabel>
          <Switch
            id="limit"
            size="lg"
            mb={2}
            colorScheme="orange"
            isChecked={notificationSettings.is_expiration_warning}
            onChange={() => handleSwitchChange("is_expiration_warning")}
          />
        </Box>

        <Box display={"flex"} alignItems={"center"} mt={"30px"}>
          <FormLabel
            htmlFor="notenough"
            fontSize={"18px"}
            fontWeight={"semibold"}
          >
            備蓄量が足りない通知
          </FormLabel>
          <Switch
            id="notenough"
            size="lg"
            mb={2}
            colorScheme="orange"
            isChecked={notificationSettings.is_low_stock_warning}
            onChange={() => handleSwitchChange("is_low_stock_warning")}
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default NotificationSettings;
