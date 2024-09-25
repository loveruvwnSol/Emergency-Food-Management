import { Box, Text } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";

export const Widget = () => {
  return (
    <Box
      w={"372px"}
      height={"150px"}
      backgroundColor={"#FB8B24"}
      borderRadius={10}
      padding={5}
      mr={8}
      color={"white"}
      boxShadow={"0 10px 10px #FED6B1"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"bold"} fontSize={24}>
          新しい非常食を登録
        </Text>
        <FiChevronRight size={32} />
      </Box>
      <Text mt={2} ml={2}>
        期限が1年以上先の食品
      </Text>
      <Text
        fontWeight={"bold"}
        fontSize={24}
        mt={2}
        ml={2}
        w={20}
        textAlign={"center"}
        borderRadius={10}
        background={"white"}
        color={"#FB8B24"}
      >
        3件
      </Text>
    </Box>
  );
};