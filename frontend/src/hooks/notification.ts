import axios from "axios";
import { useEffect, useState } from "react";
import { useFamily } from "./family";

export const useNotification = () => {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const token = sessionStorage.getItem("TOKEN_KEY");
  const [{ familyID }] = useFamily();

  useEffect(() => {
    GetInvitations();
    GetNotifications();
  }, [familyID]);

  const GetInvitations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/invitations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setInvitations(res.data.invitations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetNotifications = async () => {
    try {
      if (familyID) {
        const res = await axios.get(
          `http://localhost:8080/notifications/${familyID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setNotifications(res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [{ notifications, invitations, setInvitations }];
};
