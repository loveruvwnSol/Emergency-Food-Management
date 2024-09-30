import Bell from "../../atoms/Base/Bell";
import { Badge, Box } from "@chakra-ui/react";
import Logo from "../../atoms/Base/Logo";
import { useNotification } from "../../../hooks/notification";
import { Link } from "react-router-dom";

const Header = () => {
  const [{ notifications, invitations }] = useNotification();

  const unreadItems = notifications?.filter(
    (notification) => notification.notification.is_read === false
  );

  return (
    <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={12}>
      <Box mt={2} ml={5}>
        <Logo size="58" />
      </Box>
      <Link to="/notifications">
        {unreadItems.length || invitations?.length ? (
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
              {unreadItems.length + invitations?.length}
            </Badge>
          </Box>
        ) : (
          <Box mr={3} mt={2}>
            <Bell />
          </Box>
        )}
      </Link>
    </Box>
  );
};

export default Header;
