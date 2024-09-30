import { Box, Image, Text } from "@chakra-ui/react";
import WaterImage from "../../../images/water.jpg";
import { Item } from "../../../hooks/items";

type ExpiringItemsProps = {
  size: number;
  item: Item;
};

const ExpiringItem: React.FC<ExpiringItemsProps> = ({ item, size }) => {
  const formatSlashDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      pt={4}
    >
      <Box w={size} h="auto" aspectRatio={1}>
        <Image
          w="100%"
          h="100%"
          height={size}
          mb={4}
          src={WaterImage}
          alt="water"
          objectFit="cover"
        />
      </Box>
      <Text fontWeight={"bold"}>{item.name}</Text>
      <Text fontWeight={"bold"} color={"#FB8B24"}>
        {formatSlashDate(item.expiration)}
      </Text>
    </Box>
  );
};

export default ExpiringItem;
