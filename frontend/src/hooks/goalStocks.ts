import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "./user";

export type Stock = {
  food: number;
  drink: number;
};

export const useGoalStocks = () => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [{ user }] = useUser();
  const token = sessionStorage.getItem("TOKEN_KEY");

  const GetGoalStocks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${user?.id}/stocks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setStock(response.data.stock);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetGoalStocks();
  }, []);

  const UpdateGoalStocks = async (newStock: Stock) => {
    try {
      const response = await axios.put(
       `http://localhost:8080/users/${user?.id}/stocks`,
        newStock,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setStock(newStock);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    stock,
    GetGoalStocks,
    UpdateGoalStocks,
  };
};
