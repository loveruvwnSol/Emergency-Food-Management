import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import WaterImage from "../../../images/water.jpg";
import { NewItemModal } from "../../organisms/Items/NewItemModal";
import { Item } from "../../../hooks/items";

type StockItemProps = {
  size: number;
  item: Item;
  AddNewItem: (
    name: string,
    expiration: string,
    stock: number,
    type: string
  ) => Promise<void>;
  UpdateItem: (
    id: number,
    name: string,
    expiration: string,
    stock: number,
    type: string
  ) => Promise<void>;
  DeleteItem: (itemID: number) => Promise<void>;
};

export const StockItem: React.FC<StockItemProps> = ({
  size,
  item,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatSlashDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
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
        {formatSlashDate(item.expiration)}
      </Text>
      <NewItemModal
        isOpen={isOpen}
        onClose={onClose}
        mode="edit"
        item={item}
        image={WaterImage}
        AddNewItem={AddNewItem}
        UpdateItem={UpdateItem}
        DeleteItem={DeleteItem}
      />
    </Box>
  );
};
