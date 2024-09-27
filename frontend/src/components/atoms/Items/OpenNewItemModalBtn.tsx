import { Button } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

type OpenNewItemModalBtn = {
  onOpen: () => void;
};

export const OpenNewItemModalBtn: React.FC<OpenNewItemModalBtn> = ({
  onOpen,
}) => {
  return (
    <Button
      w={16}
      h={16}
      borderRadius={44}
      background={"#FB8B24"}
      position={"fixed"}
      _hover={{ opacity: 0.5 }}
      _active={{ bgColor: "#FED6B1" }}
      cursor={"pointer"}
      bottom={"60px"}
      right={"80px"}
      onClick={onOpen}
    >
      <FiPlus color="white" size={32} />
    </Button>
  );
};
