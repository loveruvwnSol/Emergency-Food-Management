import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useFamily } from "../../../hooks/family";

type UserListProps = {
  id: number;
  name: string;
};

const UserList: React.FC<UserListProps> = ({ id, name }) => {
  const [{ InviteUserForFamily }] = useFamily();
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m={5}
        mb={2}
        ml={8}
        w={"400px"}
        h={"60px"}
      >
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <Box //アイコン
            w={"55px"}
            h={"55px"}
            borderRadius={50}
            border={"1px solid"}
          ></Box>
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
    </>
  );
};

export default UserList;
