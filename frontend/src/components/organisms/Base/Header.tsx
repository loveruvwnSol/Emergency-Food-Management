import Bell from "../../atoms/Base/Bell";
import { Badge, Box, Image } from "@chakra-ui/react";
import Logo from "../../atoms/Base/Logo";
import { useNotification } from "../../../hooks/notification";
import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/user";
import defaultAvatar from "../../../images/defaultAvatar.png";

const Header = () => {
  const [{ notifications, invitations }] = useNotification();
  const [{ user }] = useUser();

  const unreadItems = notifications?.filter(
    (notification) => notification.notification.is_read === false
  );

  return (
    <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={12}>
      <Box mt={2} ml={5}>
        <Logo size="58" />
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={7} m={0} w={32}>
        {user?.icon_url ? (
          <Image
            src={user?.icon_url}
            alt="User Icon"
            w={"30%"}
            border={"1px solid"}
            borderColor={"gray.300"}
            borderRadius={"50%"}
            objectFit={"cover"}
          />
        ) : (
          <Image
            mb={2}
            src={defaultAvatar}
            alt="User Icon"
            w={"30%"}
            border={"1px solid"}
            borderColor={"gray.300"}
            borderRadius={"50%"}
            objectFit={"cover"}
          />
        )}
        <Link to="/notifications">
          {unreadItems?.length || invitations?.length ? (
            <Box position={"relative"} display="inline-block">
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
                {unreadItems?.length + invitations?.length}
              </Badge>
            </Box>
          ) : (
            <Box mr={3} mt={2}>
              <Bell />
            </Box>
          )}
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
