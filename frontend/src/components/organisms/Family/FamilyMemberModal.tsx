import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import FamilyMembers from "./FamilyMembers";
import InviteFamilyBtn from "../../molecules/Family/InviteFamilyBtn";
import { FamilyMember } from "../../../hooks/family";

type FamilyMemberModalProps = {
  onClose: () => void;
  isOpen: boolean;
  familyMembers: FamilyMember[];
};

const FamilyMemberModal: React.FC<FamilyMemberModalProps> = ({
  onClose,
  isOpen,
  familyMembers,
}) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW={"1000px"} h={"600px"}>
          <ModalBody position={"relative"}>
            <Box
              width={"100%"}
              height={"100%"}
              overflowY={"auto"}
              maxH={"580px"}
              m={"0 auto"}
              pl={10}
            >
              <Box pt={10}>
                <Text fontSize={"24px"} fontWeight={"bold"}>
                  家族一覧({familyMembers.length})
                </Text>

                {familyMembers.map((member, index) => (
                  <FamilyMembers
                    userID={member.user_id}
                    name={member.User.name}
                    food={3}
                    drink={3}
                    key={index}
                  />
                ))}
              </Box>
            </Box>
            <Box position={"absolute"} bottom={8} right={12}>
              <InviteFamilyBtn />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FamilyMemberModal;
