import { Box, Grid, Text } from "@chakra-ui/react";
import { StockItem } from "../Base/StockItem";
import { Item } from "../../../hooks/items";

type StockItemListProps = {
  items: Item[];
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

const StockItemList: React.FC<StockItemListProps> = ({
  items,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  return (
    <Box mb={10} maxH={"500px"} overflowY={"auto"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={8}
      ></Box>
      {items?.length >= 1 ? (
        <Box display={"flex"} alignItems={"center"} gap={10}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {items.map((e: any) => (
              <StockItem
                key={e.id}
                size={165}
                item={e}
                AddNewItem={AddNewItem}
                UpdateItem={UpdateItem}
                DeleteItem={DeleteItem}
              />
            ))}
          </Grid>
        </Box>
      ) : (
        <Text fontWeight={"bold"} fontSize={20} ml={2}>
          アイテムがありません
        </Text>
      )}
    </Box>
  );
};

export default StockItemList;
