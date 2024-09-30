import { Box, Text } from "@chakra-ui/react";

type InviteUserProps = {
    name: string;
}

const InviteUser: React.FC<InviteUserProps> = ({ name }) => {
    return (
        <Box display={"flex"} alignItems={"center"} gap={4}>
            <Box //アイコン
                w={"55px"}
                h={"55px"}
                borderRadius={50}
                border={"1px solid"}
                bgColor="#828282"
            ></Box>
            <Text fontWeight="bold">{name}</Text>
        </Box>
    );
}

export default InviteUser;
