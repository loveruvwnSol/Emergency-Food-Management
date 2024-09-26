import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import SearchMemberInput from "../../molecules/Family/SearchMember";
import FamilyMemberBoard from "./FamilyMemberBoard";
import { useUser } from "../../../hooks/user";

type InviteFamilyModalProps = {
  isSecondModalOpen: boolean;
  onSecondModalClose: () => void;
};

const InviteFamilyModal: React.FC<InviteFamilyModalProps> = ({
  isSecondModalOpen,
  onSecondModalClose,
}) => {
  const [{ independentUsers, GetIndependentUsers, SearchIndependentUsers }] =
    useUser();

  return (
    <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
      <ModalOverlay />
      <ModalContent maxW={"1000px"} h={"600px"} mt={"96px"}>
        <ModalHeader
          textAlign={"center"}
          fontSize={"26px"}
          fontWeight={"bold"}
          mt={"8px"}
          mb={"12px"}
        >
          家族を追加しよう！
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchMemberInput
            SearchIndependentUsers={SearchIndependentUsers}
            GetIndependentUsers={GetIndependentUsers}
          />
          <FamilyMemberBoard independentUsers={independentUsers} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InviteFamilyModal;
