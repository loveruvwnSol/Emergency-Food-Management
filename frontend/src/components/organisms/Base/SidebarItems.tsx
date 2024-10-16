import { Box, Icon, Text } from "@chakra-ui/react";
import { IoIosList, IoMdSettings } from "react-icons/io";
import {
  IoListSharp,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoPeople,
  IoNotificationsSharp,
} from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { GoHome, GoHomeFill } from "react-icons/go";
import { NavLink } from "react-router-dom";

const SidebarItems = () => {
  const data = [
    { label: "ホーム", icon: GoHome, activeIcon: GoHomeFill, link: "/" },
    { label: "一覧", icon: IoIosList, activeIcon: IoListSharp, link: "/items" },
    { label: "家族", icon: BsPeople, activeIcon: IoPeople, link: "/family" },
    {
      label: "通知",
      icon: IoNotificationsOutline,
      activeIcon: IoNotificationsSharp,
      link: "/notifications",
    },
    {
      label: "設定",
      icon: IoSettingsOutline,
      activeIcon: IoMdSettings,
      link: "/settings",
    },
  ];

  return (
    <Box mr={12} display={{ base: "none", sm: "flex" }} flexDirection={"column"}>
      {data.map((data, index) => (
        <NavLink to={data.link} key={index}>
          {({ isActive }) => (
            <Box
              w={"210px"}
              h={"42px"}
              ml={3}
              borderRadius={"10px"}
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              bg={isActive ? "#f0f0f0" : "transparent"}
              _hover={{ bgColor: "#f0f0f0" }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                ml={3}
              >
                <Icon
                  as={isActive ? data.activeIcon : data.icon}
                  boxSize={"24px"}
                  mr={8}
                />
                <Text fontWeight={"medium"} fontSize={"16px"}>
                  {data.label}
                </Text>
              </Box>
            </Box>
          )}
        </NavLink>
      ))}
    </Box>
  );
};

export default SidebarItems;
