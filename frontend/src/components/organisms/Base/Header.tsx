import Bell from "../../atoms/Base/Bell";
import { Alert, Box, Button, Text } from "@chakra-ui/react";
import Logo from "../../atoms/Base/Logo";
import { useNotification } from "../../../hooks/notification";
import { useFamily } from "../../../hooks/family";

const Header = () => {
  const [{ notifications, setNotifications }] = useNotification();
  const [{ JoinToFamily }] = useFamily();

  if (!notifications) {
    return <Text>loading...</Text>;
  }

  return (
    <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={12}>
      <Box mt={2} ml={5}>
        <Logo size="58" />
      </Box>
      {notifications.length !== 0 ? (
        <Alert
          w={"800px"}
          bg={"#FB8B24"}
          color={"white"}
          fontWeight={"bold"}
          display={"flex"}
          justifyContent={"center"}
          gap={10}
          borderRadius={10}
          boxShadow={"0 10px 10px #FED6B1"}
          zIndex={10}
        >
          {notifications[0].Inviter.name}さんから招待が届きました！
          <Button
            bg={"white"}
            color={"#FB8B24"}
            onClick={() =>
              JoinToFamily(notifications[0].family_id, setNotifications)
            }
          >
            招待を受ける
          </Button>
        </Alert>
      ) : (
        <></>
      )}

      <Box mr={3} mt={2}>
        <Bell />
      </Box>
    </Box>
  );
};

export default Header;
