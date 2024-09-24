import { Box, Text } from "@chakra-ui/react";
import { FoodItem } from "../../molecules/Base/FoodItem";
import { Link } from "react-router-dom";

type FoodItemListProps = {
  title: string;
};

export const FoodItemList: React.FC<FoodItemListProps> = ({ title }) => {
  return (
    <Box mb={10}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} mb={8} >
        <Text fontSize={24} fontWeight={"bold"}>
          {title}
        </Text>
        <Link to={"/items"}>
          <Text
            color={"#FB8B24"}
            textDecoration={"underline"}
            _hover={{ opacity: 0.5 }}
          >
            もっと見る
          </Text>
        </Link>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={10}>
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
      </Box>
    </Box>
  );
};
