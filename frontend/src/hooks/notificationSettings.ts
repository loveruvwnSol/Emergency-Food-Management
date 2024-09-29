import axios from 'axios';
import { useEffect, useState } from 'react';

export type NotificationSettings = {
  is_expiration_warning: boolean;
  is_low_stock_warning: boolean;
};

export const UseNotificationSettings = () => {
  const [NotificationSettings, setNotificationSettings] = useState<NotificationSettings | null>(
    null
  ); // 初期値はnullに設定
  const token = sessionStorage.getItem('TOKEN_KEY');

  // 現在のユーザーの通知設定を取得する関数
  const GetNotificationSettings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/notifications/settings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setNotificationSettings(response.data.notification);
      }
    } catch (error) {
      alert('通知設定の取得に失敗しました。');
    }
  };

  useEffect(() => {
    GetNotificationSettings();
  }, []);

  const UpdateNotificationSettings = async (newNotificationSettings: NotificationSettings) => {
    try {
      const response = await axios.put(
        'http://localhost:8080/notifications/settings',
        newNotificationSettings, // 新しい通知設定
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotificationSettings(newNotificationSettings);
        console.log('通知設定を更新しました。');
      }
    } catch (error) {
      console.log('通知設定の更新に失敗しました。', error); // エラーメッセージを詳細に表示
    }
  };
  return {
    NotificationSettings,
    GetNotificationSettings, // 現在の通知設定を再取得するための関数
    UpdateNotificationSettings, // 通知設定を更新するための関数
  };
};
