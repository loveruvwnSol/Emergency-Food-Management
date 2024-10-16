import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import ProgressCircle from "../../atoms/Notification/ProgressCircle";
import { useStocks } from "../../../hooks/stocks";
import { useNavigate } from "react-router-dom";

const StockCircles: React.FC = () => {
  const { familyFoodStocks, familyDrinkStocks } = useStocks();
  const navigate = useNavigate();

  if (!familyFoodStocks || !familyDrinkStocks) {
    return (
      <Box
        w={"1100px"}
        h={"500px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"36px"} fontWeight={"bold"} mb={"48px"}>
          家族がありません
        </Text>
        <Button
          color={"#fff"}
          bgColor={"#FB8B24"}
          w={"220px"}
          h={"60px"}
          borderRadius={"25px"}
          border={"none"}
          fontSize={"16px"}
          fontWeight={"bold"}
          cursor={"pointer"}
          _hover={{ bgColor: "#ffa959" }}
          onClick={() => navigate("/family")}
        >
          家族ページに移動する
        </Button>
      </Box>
    );
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
