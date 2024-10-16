import { Box, Icon, PopoverBody, PopoverContent, Text } from "@chakra-ui/react";
import { MdOutlineLogout } from "react-icons/md";

type FamilyMemberPopoverProps = {
  id: number;
  width: number;
  text: string;
  DeleteFamilyMember: (id: number) => void;
};

const FamilyMemberPopover: React.FC<FamilyMemberPopoverProps> = ({
  id,
  width,
  text,
  DeleteFamilyMember,
}) => {
  return (
    <PopoverContent w={width} _focus={{ boxShadow: "none" }}>
      <PopoverBody p={0}>
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"end"}
          alignItems="end"
          _hover={{ bgColor: "#f0f0f0" }}
          onClick={() => DeleteFamilyMember(id)}
        >
          <Box
            h={"45px"}
            w={"90%"}
            display="flex"
            alignItems="center"
            justifyContent="start"
            gap={3}
            cursor={"pointer"}
          >
            <Icon as={MdOutlineLogout} boxSize={"24px"} color={"red.600"} />
            <Text color={"red.600"} fontWeight={"bold"}>
              {text}
            </Text>
          </Box>
        </Box>
      </PopoverBody>
    </PopoverContent>
  );
};

export default FamilyMemberPopover;
