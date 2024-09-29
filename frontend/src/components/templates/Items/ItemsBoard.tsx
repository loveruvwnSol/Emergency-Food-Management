import { Box, useDisclosure } from "@chakra-ui/react";
import SearchItems from "../../molecules/Items/SearchItems";
import ItemTabs from "../../organisms/Items/ItemTabs";
import { OpenNewItemModalBtn } from "../../atoms/Items/OpenNewItemModalBtn";
import { NewItemModal } from "../../organisms/Items/NewItemModal";
import { useItems } from "../../../hooks/items";

const ItemsBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    { items, GetItems, AddNewItem, UpdateItem, DeleteItem, SearchFamilyItems },
  ] = useItems();
  return (
    <Box w={"100%"}>
      <SearchItems GetItems={GetItems} SearchFamilyItems={SearchFamilyItems} />
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
          family_id: 0,
          name: "",
          expiration: "",
          stock: 1,
          type: "",
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
