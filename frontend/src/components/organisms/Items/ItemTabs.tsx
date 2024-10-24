import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import StockItemList from "../../molecules/Items/StockItemList";
import { Item } from "../../../hooks/items";

type ItemTabsProps = {
  items: Item[];
  image: File | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  AddNewItem: (
    name: string,
    expiration: string,
    stock: number,
    type: string,
    file: File,
    onClose: () => void
  ) => Promise<void>;
  UpdateItem: (
    id: number,
    name: string,
    expiration: string,
    stock: number,
    type: string,
    file: File | undefined,
    image_url: string | undefined,
    onClose: () => void
  ) => Promise<void>;
  DeleteItem: (itemID: number) => Promise<void>;
};

const ItemTabs: React.FC<ItemTabsProps> = ({
  items,
  image,
  setImage,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  const foodItems = items?.filter((item) => item.type === "food");
  const drinkItems = items?.filter((item) => item.type === "drink");

  return (
    <Box>
      <Tabs>
        <TabList
          w={"210px"}
          gap={2}
          color={"#808080"}
          fontSize={"16px"}
          borderWidth={"10px"}
          border={"none"}
          borderBottom={"1px solid #d7d7d7"}
        >
          <Tab _selected={{ color: "#FB8B24" }}>全て</Tab>
          <Tab _selected={{ color: "#FB8B24" }}>食料</Tab>
          <Tab _selected={{ color: "#FB8B24" }}>飲料</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          w={"100%"}
          height="2px"
          bg="#FB8B24"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <StockItemList
              image={image}
              setImage={setImage}
              AddNewItem={AddNewItem}
              UpdateItem={UpdateItem}
              DeleteItem={DeleteItem}
              items={items}
            />
          </TabPanel>
          <TabPanel>
            <StockItemList
              image={image}
              setImage={setImage}
              AddNewItem={AddNewItem}
              UpdateItem={UpdateItem}
              DeleteItem={DeleteItem}
              items={foodItems}
            />
          </TabPanel>
          <TabPanel>
            <StockItemList
              image={image}
              setImage={setImage}
              AddNewItem={AddNewItem}
              UpdateItem={UpdateItem}
              DeleteItem={DeleteItem}
              items={drinkItems}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ItemTabs;
