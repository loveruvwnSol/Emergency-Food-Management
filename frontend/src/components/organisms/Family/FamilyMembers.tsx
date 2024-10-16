import {
  Box,
  Icon,
  Image,
  Popover,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { User } from "../../../hooks/user";
import defaultAvatar from "../../../images/defaultAvatar.png";
import { FiMoreHorizontal } from "react-icons/fi";
import FamilyMemberPopover from "../../molecules/Family/FamilyMemberPopover";

type FamilyMembersProps = {
  user: User | undefined;
  isShow: boolean;
  userID: number;
  name: string;
  icon: string | undefined;
  food: number;
  drink: number;
  DeleteFamilyMember: (id: number) => void;
};

const FamilyMembers: React.FC<FamilyMembersProps> = ({
  user,
  isShow,
  userID,
  name,
  icon,
  drink,
  food,
  DeleteFamilyMember,
}) => {
  if (!user) {
    return <Text>loading...</Text>;
  }

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        mb={2}
        mt={10}
        w={"800px"}
        h={"60px"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"} w={72} gap={8}>
            <Box
              w={"60px"}
              h={"60px"}
              borderRadius={50}
              border={"1px solid"}
              borderColor={"gray.300"}
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
              {icon ? (
                <Image
                  src={icon}
                  alt="User Icon"
                  w={"100%"}
                  h={"100%"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                />
              ) : (
                <Image
                  src={defaultAvatar}
                  alt="User Icon"
                  w={"100%"}
                  h={"100%"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                />
              )}
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
          {isShow ? (
            <Popover placement="right">
              <PopoverTrigger>
                <Box
                  p={2}
                  ml={3}
                  _hover={{ bgColor: "gray.100", borderRadius: "50%" }}
                  cursor={"pointer"}
                >
                  <FiMoreHorizontal size={20} opacity={"50%"} />
                </Box>
              </PopoverTrigger>
              <FamilyMemberPopover
                id={userID}
                width={user.id === userID ? 220 : 300}
                text={
                  user.id === userID
                    ? "家族から退出する"
                    : "このユーザーを退出させる"
                }
                DeleteFamilyMember={DeleteFamilyMember}
              />
            </Popover>
          ) : (
            <>
              {user.id === userID ? (
                <Popover placement="right">
                  <PopoverTrigger>
                    <Box
                      p={2}
                      ml={3}
                      _hover={{ bgColor: "gray.100", borderRadius: "50%" }}
                      cursor={"pointer"}
                    >
                      <FiMoreHorizontal size={20} opacity={"50%"} />
                    </Box>
                  </PopoverTrigger>
                  <FamilyMemberPopover
                    id={userID}
                    width={220}
                    text={"家族から退出する"}
                    DeleteFamilyMember={DeleteFamilyMember}
                  />
                </Popover>
              ) : (
                <></>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FamilyMembers;
