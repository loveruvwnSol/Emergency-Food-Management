import { Box, Text } from "@chakra-ui/react";
import { StockItem } from "../../molecules/Base/StockItem";
import { Link } from "react-router-dom";
import { Item } from "../../../hooks/items";

type HomeStockItemListProps = {
  title: string;
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

export const HomeStockItemList: React.FC<HomeStockItemListProps> = ({
  title,
  items,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  return (
    <Box mb={10}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={8}
      >
        <Text fontSize={24} fontWeight={"bold"}>
          {title}
        </Text>
        {items.length >= 1 ? (
          <Link to={"/items"}>
            <Text
              color={"#FB8B24"}
              textDecoration={"underline"}
              _hover={{ opacity: 0.5 }}
              ml={5}
            >
              もっと見る
            </Text>
          </Link>
        ) : (
          <Link to={"/items"}>
            <Text
              color={"#FB8B24"}
              textDecoration={"underline"}
              _hover={{ opacity: 0.5 }}
              ml={5}
            >
              アイテムを追加しに行く
            </Text>
          </Link>
        )}
      </Box>
      {items.length >= 1 ? (
        <Box display={"flex"} alignItems={"center"} gap={10}>
          {items.slice(0, 4).map((e: any) => (
            <StockItem
              key={e.id}
              size={150}
              item={e}
              AddNewItem={AddNewItem}
              UpdateItem={UpdateItem}
              DeleteItem={DeleteItem}
            />
          ))}
        </Box>
      ) : (
        <Text fontWeight={"bold"} fontSize={20} ml={2}>
          アイテムがありません
        </Text>
      )}
    </Box>
  );
};
