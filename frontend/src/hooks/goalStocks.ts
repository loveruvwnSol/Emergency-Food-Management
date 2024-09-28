import axios from 'axios';
import { useEffect, useState } from 'react';

export type Stock = {
  food: number;
  drink: number;
};

export const useGoalStocks = () => {
  const [stock, setStock] = useState<Stock | null>(null); // 初期値はnullに設定
  const token = sessionStorage.getItem('TOKEN_KEY');

  // 現在のユーザーの目標ストックを取得する関数
  const getGoalStocks = async () => {
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
    getGoalStocks();
  }, []);

  const updateGoalStocks = async (newStock: Stock) => {
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
        // alert('目標ストック数を更新しました。'); このアラートつけるとバグる
      }
    } catch (error) {
      // alert('目標ストック数の更新に失敗しました。');　このアラートつけるとバグる
    }
  };

  return {
    stock,
    getGoalStocks, // 現在の目標ストック数を再取得するための関数
    updateGoalStocks, // 目標ストック数を更新するための関数
  };
};
