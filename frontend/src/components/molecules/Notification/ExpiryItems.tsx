import { Box, Text } from "@chakra-ui/react";
import ExpiringItem from "../../atoms/Notification/ExpiringItem";
import { Item } from "../../../hooks/items";

type ExpiringListProps = {
  data: {
    id: number;
    family_id: number;
    text: string;
    type: string;
    is_read: boolean;
    item_ids: number[];
    CreatedAt: string;
  };
  items: Item[];
};

const ExpiryItems: React.FC<ExpiringListProps> = ({ data, items }) => {
  return (
    <Box
      w={"1100px"}
      borderWidth="2px"
      borderColor="#828282"
      borderRadius={20}
      mt={8}
      p={4}
      gap={4}
      flexDirection="column"
    >
      <Text color="#333" textAlign="start" mb={4} fontSize="20px">
        <Box as="span" color="#FB8B24" fontWeight="bold">
          {data.text}
        </Box>
      </Text>
      <Box
        display="flex"
        gap={4}
        flexWrap="wrap"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {items.map((e, index) => (
          <ExpiringItem key={index} item={e} size={140} />
        ))}
      </Box>
    </Box>
  );
};

export default ExpiryItems;
