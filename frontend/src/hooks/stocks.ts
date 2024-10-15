import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "./user";
import { useFamily } from "./family";

export type Stock = {
  food: number;
  drink: number;
};

export type FamilyStock = {
  goal: number;
  current: number;
  longShelfLifeCount: number;
  nearExpiryCount: number;
};

export const useStocks = () => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [familyFoodStocks, setFamilyFoodStocks] = useState<FamilyStock | null>(
    null
  );
  const [familyDrinkStocks, setFamilyDrinkStocks] =
    useState<FamilyStock | null>(null);
  const [{ user }] = useUser();
  const [{ familyID }] = useFamily();
  const token = sessionStorage.getItem("TOKEN_KEY");

  useEffect(() => {
    if (familyID) {
      GetFamilyStocks();
    }
  }, [familyID]);

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

  const GetFamilyStocks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/families/${familyID}/stocks`
      );
      if (res.status === 200) {
        setFamilyFoodStocks(res.data.familyFoodStocks);
        setFamilyDrinkStocks(res.data.familyDrinkStocks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    stock,
    familyFoodStocks,
    familyDrinkStocks,
    GetGoalStocks,
    UpdateGoalStocks,
  };
};
