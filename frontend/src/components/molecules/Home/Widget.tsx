import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { NewItemModal } from "../../organisms/Items/NewItemModal";
import { useFamily } from "../../../hooks/family";
import { useNavigate } from "react-router-dom";

type WidgetProps = {
  image: File | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  AddNewItem: (
    name: string,
    expiration: string,
    stock: number,
    type: string,
    file: File
  ) => Promise<void>;
  UpdateItem: (
    id: number,
    name: string,
    expiration: string,
    stock: number,
    type: string,
    file: File | undefined,
    image_url: string | undefined
  ) => Promise<void>;
  DeleteItem: (itemID: number) => Promise<void>;
};
export const Widget: React.FC<WidgetProps> = ({
  image,
  setImage,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ familyID }] = useFamily();
  return (
    <Box
      w={"372px"}
      height={"150px"}
      backgroundColor={"#FB8B24"}
      borderRadius={10}
      padding={5}
      mr={8}
      color={"white"}
      boxShadow={"0 10px 10px #FED6B1"}
      onClick={familyID ? onOpen : onClose}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"bold"} fontSize={24}>
          新しい非常食を登録
        </Text>
        <FiChevronRight size={32} />
      </Box>
      <Text mt={2} ml={2}>
        期限が1年以上先の食品
      </Text>
      <Text
        fontWeight={"bold"}
        fontSize={24}
        mt={2}
        ml={2}
        w={20}
        textAlign={"center"}
        borderRadius={10}
        background={"white"}
        color={"#FB8B24"}
      >
        3件
      </Text>
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
          image_url: "",
        }}
        image={image}
        setImage={setImage}
        AddNewItem={AddNewItem}
        UpdateItem={UpdateItem}
        DeleteItem={DeleteItem}
      />
    </Box>
  );
};
