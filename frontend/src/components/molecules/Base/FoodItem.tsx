import { Box, Image, Text } from "@chakra-ui/react";
import WaterImage from "../../../images/water.jpg";

export const FoodItem = () => {
  return (
    <Box>
      <Image
        border={"2px"}
        borderColor={"gray.300"}
        borderRadius={14}
        w={"150px"}
        height={"150px"}
        src={WaterImage}
        alt="water"
      />
      <Text fontWeight={"bold"} mt={2}>天然水 2L</Text>
      <Text fontWeight={"bold"} color={"#FB8B24"} mt={1}>
        2024/01/01
      </Text>
    </Box>
  );
};
