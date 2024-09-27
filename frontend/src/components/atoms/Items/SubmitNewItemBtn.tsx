import { Button } from "@chakra-ui/react";

type SubmitNewItemBtnProp = {
  text: string;
  bg: string;
};

export const SubmitNewItemBtn: React.FC<SubmitNewItemBtnProp> = ({
  text,
  bg,
}) => {
  return (
    <Button
      float={"right"}
      bg={bg}
      color={"white"}
      pl={6}
      pr={6}
      mr={3}
      borderRadius={20}
      cursor={"pointer"}
      _hover={{ opacity: 0.5 }}
      _active={{ bgColor: "#FED6B1" }}
    >
      {text}
    </Button>
  );
};
