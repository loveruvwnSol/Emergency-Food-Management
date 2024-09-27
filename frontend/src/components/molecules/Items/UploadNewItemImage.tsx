import { Box, Icon, Image, Input, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { IoCameraOutline } from "react-icons/io5";

type UploadNewItemImageProps = {
  image: string;
};

export const UploadNewItemImage: React.FC<UploadNewItemImageProps> = ({
  image,
}) => {
  const fileInputRef = useRef<any>(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  return (
    <Box
      w={"500px"}
      h={"450px"}
      bg={"#F0E9E2"}
      border={"2px"}
      borderColor={"gray.300"}
      borderRadius={12}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      _hover={{ opacity: 0.5 }}
      cursor={"pointer"}
      onClick={() => handleIconClick()}
    >
      {image ? (
        <>
          <Image w={"500px"} h={"446px"} borderRadius={12} src={image} />
          <Input type="file" ref={fileInputRef} display={"none"} />
        </>
      ) : (
        <>
          <Icon as={IoCameraOutline} boxSize={20} top={26} right={27.5} />
          <Text>写真を撮る</Text>
          <Input type="file" ref={fileInputRef} display={"none"} />
        </>
      )}
    </Box>
  );
};
