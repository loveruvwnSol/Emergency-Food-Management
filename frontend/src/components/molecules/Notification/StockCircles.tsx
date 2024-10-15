import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ProgressCircle from "../../atoms/Notification/ProgressCircle";
import { useStocks } from "../../../hooks/stocks";

const StockCircles: React.FC = () => {
  const { familyFoodStocks, familyDrinkStocks } = useStocks();

  if (!familyFoodStocks || !familyDrinkStocks) {
    return <Text>loading...</Text>;
  }

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
          current={familyFoodStocks.current}
          goal={familyFoodStocks.goal}
          color="#FB8B24"
        />
      </Box>
      <Box textAlign="center" marginX={16}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          飲料備蓄達成度
        </Text>
        <ProgressCircle
          current={familyDrinkStocks.current}
          goal={familyDrinkStocks.goal}
          color="#00C2FF"
        />
      </Box>
    </Box>
  );
};

export default StockCircles;
