import {
  Badge,
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import LowStock from "../../organisms/Notification/LowStock";
import InviteNotice from "../../organisms/Notification/InviteNotice";
import ExpiryList from "../../organisms/Notification/ExpiryList";
import { useNotification } from "../../../hooks/notification";

const NotificationTabs = () => {
  const [{ notifications, invitations }] = useNotification();

  const unreadItems = notifications?.filter(
    (notification) => notification.notification.is_read === false
  );
  
  return (
    <Box>
      <Tabs>
        <TabList
          display={"flex"}
          justifyContent={"space-between"}
          w={"390px"}
          gap={2}
          color={"#808080"}
          fontSize={"16px"}
          borderWidth={"10px"}
          border={"none"}
          borderBottom={"1px solid #d7d7d7"}
        >
          <Tab _selected={{ color: "#FB8B24" }} gap={3}>
            備蓄量不足
          </Tab>
          <Tab _selected={{ color: "#FB8B24" }} gap={3}>
            消費期限間近
            {unreadItems.length ? (
              <Badge
                backgroundColor="#FB8B24"
                color="white"
                borderRadius="full"
                fontSize="0.8em"
                w={5}
                h={5}
                textAlign={"center"}
              >
                {unreadItems.length}{" "}
              </Badge>
            ) : (
              <></>
            )}
          </Tab>
          <Tab _selected={{ color: "#FB8B24" }} gap={3}>
            招待
            {invitations.length ? (
              <Badge
                backgroundColor="#FB8B24"
                color="white"
                borderRadius="full"
                fontSize="0.8em"
                w={5}
                h={5}
                textAlign={"center"}
              >
                {invitations.length}
              </Badge>
            ) : (
              <></>
            )}
          </Tab>
        </TabList>

        <TabIndicator
          mt="-1.5px"
          w={"100%"}
          height="2px"
          bg="#FB8B24"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <LowStock />
          </TabPanel>
          <TabPanel>
            <ExpiryList />
          </TabPanel>
          <TabPanel>
            <InviteNotice />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NotificationTabs;
