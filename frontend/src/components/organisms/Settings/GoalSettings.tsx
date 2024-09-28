import FoodGoalSetting from '../../molecules/Settings/FoodGoalSetting';
import DrinkGoalSetting from '../../molecules/Settings/DrinkGoalSetting';

import { useEffect, useState } from 'react';
import { useGoalStocks } from '../../../hooks/goalStocks';

const GoalSettings = () => {
  const { stock, updateGoalStocks } = useGoalStocks();
  const [foodStock, setFoodStock] = useState<number>(3);
  const [drinkStock, setDrinkStock] = useState<number>(3);

  useEffect(() => {
    if (stock) {
      setFoodStock(stock.food);
      setDrinkStock(stock.drink);
    }
  }, [stock]);

  const handleFoodChange = (value: number) => {
    if (stock) {
      const newFoodStock = Number(value);
      updateGoalStocks({ ...stock, food: newFoodStock });
    }
  };

  const handleDrinkChange = (value: number) => {
    if (stock) {
      const newDrinkStock = Number(value);
      updateGoalStocks({ ...stock, drink: newDrinkStock });
    }
  };

  if (!stock) return null;
  return (
    <>
      <FoodGoalSetting
        handleFoodChange={handleFoodChange}
        foodStock={foodStock}
      />
      <DrinkGoalSetting
        handleDrinkChange={handleDrinkChange}
        drinkStock={drinkStock}
      />
    </>
  );
};

export default GoalSettings;
