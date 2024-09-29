import FoodGoalSetting from '../../molecules/Settings/FoodGoalSetting';
import DrinkGoalSetting from '../../molecules/Settings/DrinkGoalSetting';

import { useEffect, useState } from 'react';
import { UseGoalStocks } from '../../../hooks/goalStocks';
import { Text } from '@chakra-ui/react';

const GoalSettings = () => {
  const { stock, UpdateGoalStocks } = UseGoalStocks();
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
      UpdateGoalStocks({ ...stock, food: newFoodStock });
    }
  };

  const handleDrinkChange = (value: number) => {
    if (stock) {
      const newDrinkStock = Number(value);
      UpdateGoalStocks({ ...stock, drink: newDrinkStock });
    }
  };

  if (!stock) return <Text>loading...</Text>;
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
