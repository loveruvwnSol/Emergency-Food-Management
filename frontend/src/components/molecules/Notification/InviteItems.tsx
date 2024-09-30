import { Box, Text } from "@chakra-ui/react";
import InviteBtn from "../../atoms/Notification/InviteBtn";
import InviteUser from "../../atoms/Notification/InviteUser";

type InviteItemsProps = {
    userName: string;
    action: string; 
};

const InviteItems: React.FC<InviteItemsProps> = ({ userName, action }) => {
    const handleButtonClick = () => {
        console.log(`${userName}の通知を承認しました。`);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={4}>
            <Box display="flex" alignItems="center" gap={2} whiteSpace="nowrap">
                <InviteUser name={userName} />
                <Text>
                    {action}
                </Text>
            </Box>
            <Box ml={16}>
                <InviteBtn onClick={handleButtonClick} />
            </Box>
        </Box>
    );
};

export default InviteItems;
