import { Box } from "@chakra-ui/react";
import Header from "../components/organisms/Base/Header";
import SidebarItems from "../components/organisms/Base/SidebarItems";
import NotificationTabs from "../components/templates/Notification/NotificationTabs";

const Notifications = () => {
    return (
        <Box>
            <Header />
            <Box display="flex">
                <SidebarItems />
                <Box display="flex">
                    <Box alignSelf="flex-start">
                        <NotificationTabs />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Notifications;
