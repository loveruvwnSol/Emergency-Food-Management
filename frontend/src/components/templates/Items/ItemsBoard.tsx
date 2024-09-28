import { Box, useDisclosure } from "@chakra-ui/react";
import SearchItems from "../../molecules/Items/SearchItems";
import ItemTabs from "../../organisms/Items/ItemTabs";
import { OpenNewItemModalBtn } from "../../atoms/Items/OpenNewItemModalBtn";
import { NewItemModal } from "../../organisms/Items/NewItemModal";
import { Item, useItems } from "../../../hooks/items";

const ItemsBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ items, AddNewItem, UpdateItem, DeleteItem }] = useItems();
  return (
    <Box w={"100%"}>
      <SearchItems />
      <ItemTabs
        items={items}
        AddNewItem={AddNewItem}
        UpdateItem={UpdateItem}
        DeleteItem={DeleteItem}
      />
      <OpenNewItemModalBtn onOpen={onOpen} />
      <NewItemModal
        isOpen={isOpen}
        onClose={onClose}
        mode="add"
        item={{
          id: 0,
          name: "",
          expiration: "",
          stock: 1,
          type: "",
          image: "",
        }}
        image={""}
        AddNewItem={AddNewItem}
        UpdateItem={UpdateItem}
        DeleteItem={DeleteItem}
      />
    </Box>
  );
};

export default ItemsBoard;
