import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { StockItem } from "../Base/StockItem";
import { Item } from "../../../hooks/items";
import { useNavigate } from "react-router-dom";

type StockItemListProps = {
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

const StockItemList: React.FC<StockItemListProps> = ({
  items,
  image,
  setImage,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  const navigate = useNavigate();
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
          <Grid templateColumns="repeat(5, 1fr)" gap={9} ml={3}>
            {items.map((e: any) => (
              <StockItem
                key={e.id}
                item={e}
                image={image}
                setImage={setImage}
                AddNewItem={AddNewItem}
                UpdateItem={UpdateItem}
                DeleteItem={DeleteItem}
              />
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          w={"1100px"}
          h={"500px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize={"36px"} fontWeight={"bold"} mb={"48px"}>
            家族がありません
          </Text>
          <Button
            color={"#fff"}
            bgColor={"#FB8B24"}
            w={"220px"}
            h={"60px"}
            borderRadius={"25px"}
            border={"none"}
            fontSize={"16px"}
            fontWeight={"bold"}
            cursor={"pointer"}
            _hover={{ bgColor: "#ffa959" }}
            onClick={() => navigate("/family")}
          >
            家族ページに移動する
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StockItemList;
