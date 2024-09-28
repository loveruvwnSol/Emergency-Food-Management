import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { NewItemModalForm } from "../../molecules/Items/NewItemForm";
import { UploadNewItemImage } from "../../molecules/Items/UploadNewItemImage";
import { Item } from "../../../hooks/items";

type NewItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  item: Item;
  image: string;
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

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  mode,
  item,
  image,
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
          <UploadNewItemImage image={image} />
          <NewItemModalForm
            mode={mode}
            item={item}
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
