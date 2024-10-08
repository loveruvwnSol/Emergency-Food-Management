import { Box, Text } from "@chakra-ui/react";
import InviteItem from "./InviteItem";
import { useNotification } from "../../../hooks/notification";

const InviteList = () => {
  const [{ invitations, setInvitations }] = useNotification();

  return (
    <Box>
      {invitations.length ? (
        <>
          {invitations.map((e, idx) => (
            <InviteItem
              key={idx}
              data={e}
              setInvitations={setInvitations}
            />
          ))}
        </>
      ) : (
        <Text
          height={96}
          w={"1000px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={24}
          fontWeight={"bold"}
        >
          招待はありません
        </Text>
      )}
    </Box>
  );
};

export default InviteList;
