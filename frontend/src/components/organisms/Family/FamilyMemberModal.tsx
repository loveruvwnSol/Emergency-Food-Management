import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FamilyMembers from "./FamilyMembers";
import InviteFamilyBtn from "../../molecules/Family/InviteFamilyBtn";
import { FamilyMember } from "../../../hooks/family";
import { useUser } from "../../../hooks/user";

type FamilyMemberModalProps = {
  onClose: () => void;
  isOpen: boolean;
  familyMembers: FamilyMember[];
  DeleteFamilyMember: (id: number) => void;
};

const FamilyMemberModal: React.FC<FamilyMemberModalProps> = ({
  onClose,
  isOpen,
  familyMembers,
  DeleteFamilyMember,
}) => {
  const [{ user }] = useUser();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const isAdmin = familyMembers.some(
      (member) => member.user_id === user?.id && member.role === "admin"
    );
    setIsShow(isAdmin);
  }, [familyMembers, user]);

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
                    user={user}
                    isShow={isShow}
                    userID={member.user_id}
                    name={member.User.name}
                    icon={member.User.icon_url}
                    food={3}
                    drink={3}
                    key={index}
                    DeleteFamilyMember={DeleteFamilyMember}
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
