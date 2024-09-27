import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { NewItemModalForm } from "../../molecules/Items/NewItemForm";
import { UploadNewItemImage } from "../../molecules/Items/UploadNewItemImage";
import { Item } from "../../templates/Items/ItemsBoard";

type NewItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  item: Item;
};

export const NewItemModal: React.FC<NewItemModalProps> = ({
  isOpen,
  onClose,
  mode,
  item,
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
          <UploadNewItemImage image={item.image} />
          <NewItemModalForm mode={mode} item={item} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
