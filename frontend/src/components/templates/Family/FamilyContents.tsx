import { GoPeople } from "react-icons/go";
import DataBoard from "../../molecules/Family/DataBoard";
import { Box, Icon, Text, useDisclosure } from "@chakra-ui/react";
import FamilyMemberModal from "../../organisms/Family/FamilyMemberModal";
import { FamilyMember } from "../../../hooks/family";
import { useStocks } from "../../../hooks/stocks";

type FamilyContentsProps = {
  familyMembers: FamilyMember[];
};

const FamilyContents: React.FC<FamilyContentsProps> = ({ familyMembers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { familyFoodStocks, familyDrinkStocks } = useStocks();

  if (!familyFoodStocks || !familyDrinkStocks) {
    return <Text>loading...</Text>;
  }

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"1160px"}
        >
          <Text fontSize={"28px"} fontWeight={"bold"}>
            家族の備蓄目標
          </Text>
          <Icon
            as={GoPeople}
            boxSize={"32px"}
            mr={"48px"}
            cursor={"pointer"}
            onClick={onOpen}
            _hover={{ opacity: "50%" }}
          />
        </Box>
        <Box mt={"24px"} display={"flex"} gap={20}>
          <DataBoard
            type="食料"
            goal={familyFoodStocks.goal}
            current={familyFoodStocks.current}
            longShelfLifeCount={familyFoodStocks.longShelfLifeCount}
            nearExpiryCount={familyFoodStocks.nearExpiryCount}
            bg="#FB8B24"
          />
          <DataBoard
            type="飲料"
            goal={familyDrinkStocks.goal}
            current={familyDrinkStocks.current}
            longShelfLifeCount={familyDrinkStocks.longShelfLifeCount}
            nearExpiryCount={familyDrinkStocks.nearExpiryCount}
            bg="#00C2FF"
          />
        </Box>
      </Box>
      <FamilyMemberModal
        onClose={onClose}
        isOpen={isOpen}
        familyMembers={familyMembers}
      />
    </>
  );
};

export default FamilyContents;
