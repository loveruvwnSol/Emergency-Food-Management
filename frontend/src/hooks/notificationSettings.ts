import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "./user";

export type NotificationSettings = {
  is_expiration_warning: boolean;
  is_low_stock_warning: boolean;
};

export const useNotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings | null>(null);
  const token = sessionStorage.getItem("TOKEN_KEY");
  const [{ user }] = useUser();

  const GetNotificationSettings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${user?.id}/notifications/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotificationSettings(response.data.notification);
      }
    } catch (error) {
      console.log("通知設定の取得に失敗しました。");
    }
  };

  useEffect(() => {
    GetNotificationSettings();
  }, []);

  const UpdateNotificationSettings = async (
    newNotificationSettings: NotificationSettings
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${user?.id}/notifications/settings`,
        newNotificationSettings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotificationSettings(newNotificationSettings);
        console.log("通知設定を更新しました。");
      }
    } catch (error) {
      console.log("通知設定の更新に失敗しました。", error);
    }
  };
  return {
    notificationSettings,
    UpdateNotificationSettings,
  };
};
