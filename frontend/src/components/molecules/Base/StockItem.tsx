import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import WaterImage from "../../../images/water.jpg";
import { NewItemModal } from "../../organisms/Items/NewItemModal";

type StockItemProps = {
  size: number;
};

export const StockItem: React.FC<StockItemProps> = ({ size }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const item = {
    name: "天然水 2L",
    expiration: "2024-01-01",
    stock: 3,
    type: "water",
    image: WaterImage,
  };
  return (
    <Box>
      <Image
        border={"2px"}
        borderColor={"gray.300"}
        borderRadius={14}
        w={size}
        height={size}
        src={WaterImage}
        alt="water"
        _hover={{ opacity: 0.5 }}
        cursor={"pointer"}
        onClick={onOpen}
      />
      <Text fontWeight={"bold"} mt={2}>
        {item.name}
      </Text>
      <Text fontWeight={"bold"} color={"#FB8B24"} mt={1}>
        {item.expiration}
      </Text>
      <NewItemModal
        isOpen={isOpen}
        onClose={onClose}
        mode="edit"
        item={item}
      />
    </Box>
  );
};
