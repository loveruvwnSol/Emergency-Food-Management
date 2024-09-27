import { Box, useDisclosure } from "@chakra-ui/react";
import SearchItems from "../../molecules/Items/SearchItems";
import ItemTabs from "../../organisms/Items/ItemTabs";
import { OpenNewItemModalBtn } from "../../atoms/Items/OpenNewItemModalBtn";
import { NewItemModal } from "../../organisms/Items/NewItemModal";

export type Item = {
  name: string;
  expiration: string;
  stock: number;
  type: string;
  image: string;
};

const ItemsBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const item = {
    name: "",
    expiration: "",
    stock: 1,
    type: "",
    image: "",
  };
  return (
    <Box w={"100%"}>
      <SearchItems />
      <ItemTabs />
      <OpenNewItemModalBtn onOpen={onOpen} />
      <NewItemModal isOpen={isOpen} onClose={onClose} mode="add" item={item} />
    </Box>
  );
};

export default ItemsBoard;
