import {
  AspectRatio,
  Badge,
  Box,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NewItemModal } from "../../organisms/Items/NewItemModal";
import { Item } from "../../../hooks/items";

type StockItemProps = {
  item: Item;
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

export const StockItem: React.FC<StockItemProps> = ({
  item,
  image,
  setImage,
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
    <Box position={"relative"}>
      <Badge
        position="absolute"
        top="-3"
        left="-3"
        zIndex={1}
        backgroundColor="#FB8B24"
        color="white"
        borderRadius="full"
        fontSize="0.8em"
        w={8}
        h={8}
        textAlign={"center"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={16}>{item.stock}</Text>
      </Badge>
      <AspectRatio w={"150px"} h={"150px"} ratio={4 / 3}>
        <Image
          border={"2px"}
          borderColor={"gray.300"}
          borderRadius={14}
          src={item.image_url}
          alt="itemImage"
          _hover={{ opacity: 0.5 }}
          cursor={"pointer"}
          onClick={onOpen}
        />
      </AspectRatio>
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
        image={image}
        setImage={setImage}
        AddNewItem={AddNewItem}
        UpdateItem={UpdateItem}
        DeleteItem={DeleteItem}
      />
    </Box>
  );
};
