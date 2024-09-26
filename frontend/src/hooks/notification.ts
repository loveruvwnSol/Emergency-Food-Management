import axios from "axios";
import { useEffect, useState } from "react";

export const useNotification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const token = sessionStorage.getItem("TOKEN_KEY");

  useEffect(() => {
    GetInvitations();
  }, []);

  const GetInvitations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/invitations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setNotifications(res.data.invitations);
      }
    } catch (error) {
      alert("招待の取得に失敗しました。");
    }
  };

  return [{ notifications, setNotifications }];
};
