import { Box } from "@chakra-ui/react";
import Header from "../components/organisms/Base/Header";
import SidebarItems from "../components/organisms/Base/SidebarItems";

import { Widget } from "../components/molecules/Home/Widget";
import { HomeStockItemList } from "../components/organisms/Home/HomeStockItemList";
import { useItems } from "../hooks/items";

export const Home = () => {
  const [{ items, AddNewItem, UpdateItem, DeleteItem }] = useItems();
  return (
    <Box>
      <Header />
      <Box display={"flex"}>
        <SidebarItems />
        <Box display={"flex"} flexDirection={"column"} w={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <HomeStockItemList
              items={items}
              AddNewItem={AddNewItem}
              UpdateItem={UpdateItem}
              DeleteItem={DeleteItem}
              title="非常食一覧"
            />
            <Widget />
          </Box>
          <Box display={"flex"}>
            <HomeStockItemList
              items={items}
              AddNewItem={AddNewItem}
              UpdateItem={UpdateItem}
              DeleteItem={DeleteItem}
              title="消費期限が1年以内の非常食"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
