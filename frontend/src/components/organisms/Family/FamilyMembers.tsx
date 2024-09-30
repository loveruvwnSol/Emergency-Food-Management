import { Box, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useUser } from "../../../hooks/user";

type FamilyMembersProps = {
  userID: number;
  name: string;
  icon: string | undefined;
  food: number;
  drink: number;
};

const FamilyMembers: React.FC<FamilyMembersProps> = ({
  userID,
  name,
  icon,
  drink,
  food,
}) => {
  const [{ user }] = useUser();

  if (!user) {
    return <Text>loading...</Text>;
  }

  return (
    <>
      <Box //利用者のプロフィール
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        mb={2}
        mt={10}
        w={"800px"}
        h={"60px"}
      >
        <Box display={"flex"} alignItems={"center"} w={"80%"} gap={50}>
          <Box display={"flex"} alignItems={"center"} gap={8}>
            <Box //アイコン
              w={"60px"}
              h={"60px"}
              borderRadius={50}
              border={"1px solid"}
              position={"relative"}
            >
              {user.id === userID ? (
                <Text
                  color={"#FB8B24"}
                  fontSize={"11px"}
                  position={"absolute"}
                  top={-4}
                  right={3}
                  fontWeight={"bold"}
                >
                  あなた
                </Text>
              ) : (
                <></>
              )}
              <Image
                src={icon}
                alt="User Icon"
                w={"100%"}
                h={"100%"}
                borderRadius={"50%"}
                objectFit={"cover"}
              />
            </Box>
            <Text fontSize={"20px"} fontWeight={"bold"}>
              {name}
            </Text>
          </Box>
          <Box display={"flex"} gap={3}>
            <Box display={"flex"} alignItems={"center"}>
              <Text
                color={"#000000"}
                fontSize={"12px"}
                fontWeight={"medium"}
                opacity={"50%"}
              >
                目標備蓄数
              </Text>
              <Icon as={IoIosArrowForward} color={"#000000"} opacity={"50%"} />
            </Box>
            <Box>
              <Text
                color={"#000000"}
                fontSize={"12px"}
                fontWeight={"medium"}
                opacity={"50%"}
              >
                食料{food}日分
              </Text>
              <Text
                color={"#000000"}
                fontSize={"12px"}
                fontWeight={"medium"}
                opacity={"50%"}
              >
                飲料{drink}日分
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FamilyMembers;
