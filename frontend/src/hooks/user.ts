import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState({});
  const token = sessionStorage.getItem("TOKEN_KEY");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      alert("ユーザーの取得に失敗しました。");
    }
  };

  return [{ user }];
};
