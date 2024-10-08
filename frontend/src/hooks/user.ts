import axios from "axios";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  CreateAt: string;
  icon_url?: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User>();
  const [independentUsers, setIndependentUsers] = useState<User[]>();
  const token = sessionStorage.getItem("TOKEN_KEY");

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetIndependentUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/independent");
      if (res.status === 200) {
        setIndependentUsers(res.data.independentUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SearchIndependentUsers = async (query: string) => {
    if (query.trim()) {
      try {
        const res = await axios.get("http://localhost:8080/users/search", {
          params: { q: query },
        });
        if (res.status === 200) {
          setIndependentUsers(res.data.filteredUsers);
        }
      } catch (error) {
        alert("検索に失敗しました。");
      }
    }
  };

  const UpdateUsername = async (newName: string) => {
    const token = sessionStorage.getItem("TOKEN_KEY");
    try {
      const res = await axios.put(
        `http://localhost:8080/users/${user?.id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, name: newName } : prevUser
        );
        alert('ユーザー名を更新しました。');
      }
    } catch (error) {
      alert("ユーザー名の更新に失敗しました。");
    }
  };

  const UpdateUserIcon = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset");

    try {
      const uploadRes = await axios.post(
        process.env.REACT_APP_CLOUDINARY_UPLOAD_URL as string,
        formData
      );

      const iconUrl = uploadRes.data.secure_url;

      const res = await axios.put(
        `http://localhost:8080/users/${user?.id}/icon`,
        { icon_url: iconUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, icon_url: iconUrl } : prevUser
        );
        alert("アイコンを更新しました。");
      }
    } catch (error) {
      alert("アイコンの更新に失敗しました。");
    }
  };

  return [
    {
      user,
      independentUsers,
      GetIndependentUsers,
      SearchIndependentUsers,
      UpdateUsername,
      UpdateUserIcon,
    },
  ];
};
