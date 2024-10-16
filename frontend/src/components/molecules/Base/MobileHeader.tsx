import Bell from "../../atoms/Base/Bell";
import { Badge, Box, Text } from "@chakra-ui/react";
import { useNotification } from "../../../hooks/notification";
import { Link } from "react-router-dom";

type MobileHeaderProps = {
  title: string;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ title }) => {
  const [{ notifications, invitations }] = useNotification();

  const unreadItems = notifications?.filter(
    (notification) => notification.notification.is_read === false
  );
  return (
    <Box mt={14} mb={10}>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center" 
      mt={6}
      position="relative" 
    >
      <Text fontWeight="bold" fontSize="32px">
        {title}
      </Text>
      <Link to="/notifications">
        {unreadItems?.length || invitations?.length ? (
          <Box
            position="absolute"
            right="0"
            mt="0.8"
          >
            <Bell size="36px" />
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
              textAlign="center"
            >
              {unreadItems?.length + invitations?.length}
            </Badge>
          </Box>
        ) : (
          <Box position="absolute" right="0" top="0" mt="0.8">
            <Bell size="36px" />
          </Box>
        )}
      </Link>
    </Box>
  </Box>
  );
};

export default MobileHeader;
