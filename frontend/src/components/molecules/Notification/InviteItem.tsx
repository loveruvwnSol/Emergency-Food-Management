import { Box, Text } from "@chakra-ui/react";
import InviteBtn from "../../atoms/Notification/InviteBtn";
import InviteUser from "../../atoms/Notification/InviteUser";
import { useFamily } from "../../../hooks/family";

type InviteItemProps = {
  data: any;
  setInvitations: React.Dispatch<React.SetStateAction<any[]>>;
};

const InviteItem: React.FC<InviteItemProps> = ({
  data,
  setInvitations,
}) => {
  const [{ JoinToFamily }] = useFamily();
  const handleButtonClick = () => {
    JoinToFamily(data.family_id, setInvitations);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
    >
      <Box display="flex" alignItems="center" gap={2} whiteSpace="nowrap">
        <InviteUser data={data} />
        <Text>から招待されました！</Text>
      </Box>
      <Box ml={16}>
        <InviteBtn onClick={handleButtonClick} />
      </Box>
    </Box>
  );
};

export default InviteItem;
