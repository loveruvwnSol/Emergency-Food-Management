import { Box, Icon, Text } from "@chakra-ui/react";
import { IoFlagOutline, IoBagCheckOutline } from "react-icons/io5";
import { CiFaceSmile, CiFaceFrown } from "react-icons/ci";

import React from "react";

type DataBoardProps = {
  type: string;
  goal: number;
  current: number;
  longShelfLifeCount: number;
  nearExpiryCount: number;
  bg: string;
};

const DataBoard: React.FC<DataBoardProps> = ({
  type,
  goal,
  current,
  longShelfLifeCount,
  nearExpiryCount,
  bg,
}) => {
  const data = [
    { label: "目標", icon: IoFlagOutline, value: `${goal}日分` },
    { label: "現在", icon: IoBagCheckOutline, value: `${current}日分` },
    {
      label: "消費期限が\n余裕のある非常食",
      icon: CiFaceSmile,
      value: `${longShelfLifeCount}件`,
    },
    {
      label: "消費期限が\n余裕のない非常食",
      icon: CiFaceFrown,
      value: `${nearExpiryCount}件`,
    },
  ];

  return (
    <Box bgColor={bg} w={"500px"} h={"550px"} borderRadius={"30px"}>
      <Text
        fontSize={"32px"}
        fontWeight={"bold"}
        color={"#ffffff"}
        textAlign={"center"}
        mt={"38px"}
      >
        {type}
      </Text>

      {data.map((item, index) => (
        <Box key={index} width={"95%"} height={"80px"} m={"0 auto"} mt={6}>
          <Box display={"flex"}>
            <Box
              width={"50%"}
              height={"80px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"end"}
              gap={2}
            >
              <Text
                color={"#ffffff"}
                fontWeight={"bold"}
                fontSize={index < 2 ? "22px" : "20px"}
                whiteSpace={"pre-line"}
                textAlign={"right"}
              >
                {item.label}
              </Text>
              <Icon as={item.icon} color={"#ffffff"} boxSize={"22px"} />
            </Box>
            <Box
              width={"38%"}
              height={"80px"}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Box>
                <Text color={"#ffffff"} fontWeight={"bold"} fontSize={"36px"}>
                  {item.value}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DataBoard;
