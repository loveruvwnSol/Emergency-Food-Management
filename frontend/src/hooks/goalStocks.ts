import axios from 'axios';
import { useEffect, useState } from 'react';

export type Stock = {
  food: number;
  drink: number;
};

export const UseGoalStocks = () => {
  const [stock, setStock] = useState<Stock | null>(null); // 初期値はnullに設定
  const token = sessionStorage.getItem('TOKEN_KEY');

  // 現在のユーザーの目標ストックを取得する関数
  const GetGoalStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/stocks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStock(response.data.stock);
      }
    } catch (error) {
      alert('目標ストックの取得に失敗しました。');
    }
  };

  useEffect(() => {
    GetGoalStocks();
  }, []);

  const UpdateGoalStocks = async (newStock: Stock) => {
    try {
      const response = await axios.put(
        'http://localhost:8080/stock',
        newStock, // 新しい目標ストック数
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setStock(newStock);
        console.log('目標ストック数を更新しました。');
      }
    } catch (error) {
      console.log('目標ストック数の更新に失敗しました。');
    }
  };

  return {
    stock,
    GetGoalStocks, // 現在の目標ストック数を再取得するための関数
    UpdateGoalStocks, // 目標ストック数を更新するための関数
  };
};
