import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { NewItemForm } from "../../molecules/Items/NewItemForm";
import { UploadNewItemImage } from "../../molecules/Items/UploadNewItemImage";
import { Item } from "../../../hooks/items";

type NewItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
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

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  mode,
  item,
  image,
  setImage,
  AddNewItem,
  UpdateItem,
  DeleteItem,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"1200px"} h={"700px"}>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <UploadNewItemImage image={item.image_url} setImage={setImage} />
          <NewItemForm
            mode={mode}
            item={item}
            image={image}
            onClose={onClose}
            AddNewItem={AddNewItem}
            UpdateItem={UpdateItem}
            DeleteItem={DeleteItem}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
