import { Box } from "@chakra-ui/react";
import InviteItems from "./InviteItems";

const notifications = [
    { id: 1, userName: '岩崎太郎', action: 'さんから家族に招待されました' },
    { id: 2, userName: '岩崎太郎', action: 'さんからフォローされました' },
    { id: 3, userName: '岩崎太郎', action: 'さんがコメントしました' },
];

const InviteList = () => (
    <Box>
        {notifications.map(notification => (
            <InviteItems
                key={notification.id}
                userName={notification.userName}
                action={notification.action}
            />
        ))}
    </Box>
);

export default InviteList;
