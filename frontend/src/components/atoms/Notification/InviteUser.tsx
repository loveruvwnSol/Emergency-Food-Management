import { Box, Image, Text } from "@chakra-ui/react";
import defaultAvatar from "../../../images/defaultAvatar.png";

type InviteUserProps = {
  data: any;
};

const InviteUser: React.FC<InviteUserProps> = ({ data }) => {
  return (
    <Box display={"flex"} alignItems={"center"} gap={4}>
      <Box
        w={"55px"}
        h={"55px"}
        borderRadius={50}
        border={"1px solid"}
        borderColor={"gray.300"}
      >
        {data.Inviter.icon_url ? (
          <Image
            src={data.Inviter.icon_url}
            alt="User Icon"
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            objectFit={"cover"}
          />
        ) : (
          <Image
            src={defaultAvatar}
            alt="User Icon"
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            objectFit={"cover"}
          />
        )}
      </Box>
      <Text fontWeight="bold">{data.Inviter.name}</Text>
    </Box>
  );
};

export default InviteUser;
