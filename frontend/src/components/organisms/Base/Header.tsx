import Bell from "../../atoms/Base/Bell";
import { Alert, Badge, Box, Button } from "@chakra-ui/react";
import Logo from "../../atoms/Base/Logo";
import { useNotification } from "../../../hooks/notification";
import { useFamily } from "../../../hooks/family";

const Header = () => {
  const [{ notifications, invitations, setInvitations }] = useNotification();
  const [{ JoinToFamily }] = useFamily();

  console.log(notifications);

  return (
    <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={12}>
      <Box mt={2} ml={5}>
        <Logo size="58" />
      </Box>
      {invitations.length !== 0 ? (
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
          {invitations[0].Inviter.name}さんから招待が届きました！
          <Button
            bg={"white"}
            color={"#FB8B24"}
            onClick={() =>
              JoinToFamily(invitations[0].family_id, setInvitations)
            }
          >
            招待を受ける
          </Button>
        </Alert>
      ) : (
        <></>
      )}

      {notifications?.length || invitations?.length ? (
        <Box position="relative" display="inline-block" mr={3} mt={2}>
          <Bell />
          <Badge
            position="absolute"
            top="-2"
            right="1"
            backgroundColor="#FB8B24"
            color="white"
            borderRadius="full"
            fontSize="0.8em"
            w={5}
            h={5}
            textAlign={"center"}
          >
            {notifications?.length + invitations?.length}
          </Badge>
        </Box>
      ) : (
        <Box mr={3} mt={2}>
          <Bell />
        </Box>
      )}
    </Box>
  );
};

export default Header;
