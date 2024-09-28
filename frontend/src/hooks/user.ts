import axios from 'axios';
import { useEffect, useState } from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  CreateAt: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User>();
  const [independentUsers, setIndependentUsers] = useState<User[]>();
  const token = sessionStorage.getItem('TOKEN_KEY');

  useEffect(() => {
    GetUser();
  }, []);

  const GetUser = async () => {
    try {
      const res = await axios.get('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      alert('ユーザーの取得に失敗しました。');
    }
  };

  const GetIndependentUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users');
      if (res.status === 200) {
        setIndependentUsers(res.data.independentUsers);
      }
    } catch (error) {
      alert('ユーザーの取得に失敗しました。');
    }
  };

  const SearchIndependentUsers = async (query: string) => {
    if (query.trim()) {
      try {
        const res = await axios.get('http://localhost:8080/users/search', {
          params: { q: query },
        });
        if (res.status === 200) {
          setIndependentUsers(res.data.filteredUsers);
        }
      } catch (error) {
        alert('検索に失敗しました。');
      }
    }
  };

  const UpdateUsername = async (newName: string) => {
    const token = sessionStorage.getItem('TOKEN_KEY');
    try {
      const res = await axios.put(
        'http://localhost:8080/user',
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setUser((prevUser) => (prevUser ? { ...prevUser, name: newName } : prevUser));
        // alert('ユーザー名を更新しました。');
      }
    } catch (error) {
      alert('ユーザー名の更新に失敗しました。');
    }
  };

  return [
    {
      user,
      independentUsers,
      GetIndependentUsers,
      SearchIndependentUsers,
      UpdateUsername,
    },
  ];
};
