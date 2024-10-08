import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useFamily } from "../../../hooks/family";
import defaultAvatar from "../../../images/defaultAvatar.png";

type UserListProps = {
  id: number;
  name: string;
  icon: string | undefined;
};

const UserList: React.FC<UserListProps> = ({ id, name, icon }) => {
  const [{ InviteUserForFamily }] = useFamily();
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"400px"}
      h={"60px"}
    >
      <Box display={"flex"} alignItems={"center"} gap={4}>
        <Box //アイコン
          w={"55px"}
          h={"55px"}
          borderRadius={50}
          border={"1px solid"}
          borderColor={"gray.300"}
        >
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
        <Text>{name}</Text>
      </Box>
      <Button
        w={"90px"}
        h={"40px"}
        borderRadius={"25px"}
        mr={5}
        bgColor={"#FB8B24"}
        color={"#ffffff"}
        _hover={{ bgColor: "#FB8B24" }}
        _active={{ bgColor: "#ffcb9a" }}
        onClick={() => {
          InviteUserForFamily(id);
        }}
      >
        招待
      </Button>
    </Box>
  );
};

export default UserList;
