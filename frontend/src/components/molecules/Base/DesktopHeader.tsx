import Bell from "../../atoms/Base/Bell";
import { Badge, Box, Image, Popover, PopoverTrigger } from "@chakra-ui/react";
import Logo from "../../atoms/Base/Logo";
import { useNotification } from "../../../hooks/notification";
import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/user";
import defaultAvatar from "../../../images/defaultAvatar.png";
import HeaderPopover from "../../molecules/Base/HeaderPopover";

const DesktopHeader = () => {
  const [{ notifications, invitations }] = useNotification();
  const [{ user, Logout }] = useUser();

  const unreadItems = notifications?.filter(
    (notification) => notification.notification.is_read === false
  );
  return (
    <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={12}>
      <Box mt={2} ml={5}>
        <Logo size="58" />
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={7} m={0} w={32}>
        <Popover>
          <PopoverTrigger>
            <Box cursor={"pointer"} _hover={{ opacity: "50%" }}>
              {user?.icon_url ? (
                <Image
                  src={user?.icon_url}
                  alt="User Icon"
                  w={"37px"}
                  h={"37px"}
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
                  w={"37px"}
                  h={"37px"}
                  border={"1px solid"}
                  borderColor={"gray.300"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                />
              )}
            </Box>
          </PopoverTrigger>
          <HeaderPopover Logout={Logout} />
        </Popover>
        <Link to="/notifications">
          {unreadItems?.length || invitations?.length ? (
            <Box position={"relative"} display="inline-block" mt={2} mr={3}>
              <Bell size={"24px"} />
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
              <Bell size={"24px"} />
            </Box>
          )}
        </Link>
      </Box>
    </Box>
  );
};

export default DesktopHeader;
