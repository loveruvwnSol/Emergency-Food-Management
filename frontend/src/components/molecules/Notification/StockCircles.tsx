import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ProgressCircle from "../../atoms/Notification/ProgressCircle";

const StockCircles: React.FC = () => {
  const [currentFoodStock, setCurrentFoodStock] = useState(4);
  const [goalFoodStock, setGoalFoodStock] = useState(10);

  const [currentDrinkStock, setDrinkStock] = useState(7);
  const [goalDrinkStock, setGoalDrinkStock] = useState(10);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      mx="auto"
      pt={24}
      gap={16}
    >
      <Box textAlign="center" marginX={16}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          食料備蓄達成度
        </Text>
        <ProgressCircle
          current={currentFoodStock}
          goal={goalFoodStock}
          color="#FB8B24"
        />
      </Box>
      <Box textAlign="center" marginX={16}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          飲料備蓄達成度
        </Text>
        <ProgressCircle
          current={currentDrinkStock}
          goal={goalDrinkStock}
          color="#00C2FF"
        />
      </Box>
    </Box>
  );
};

export default StockCircles;
