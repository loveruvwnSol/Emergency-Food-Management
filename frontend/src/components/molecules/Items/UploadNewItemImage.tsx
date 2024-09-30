import { AspectRatio, Box, Icon, Image, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";

type UploadNewItemImageProps = {
  image: string | undefined;
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
};

export const UploadNewItemImage: React.FC<UploadNewItemImageProps> = ({
  image,
  setImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewIcon, setPreviewIcon] = useState<string | null>(image || null); // プレビュー用のアイコンURL

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewIcon(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        await setImage(file);
      } catch (error) {
        console.error("アイコンのアップロードに失敗しました", error);
      }
    }
  };

  return (
    <>
      {previewIcon ? (
        <Box
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
          onClick={() => handleImageClick()}
        >
          <AspectRatio w="500px" h={"446px"} ratio={4 / 3}>
            <Image borderRadius={12} src={previewIcon} alt="uploadedImage" />
          </AspectRatio>
          <Input
            type="file"
            ref={fileInputRef}
            display={"none"}
            onChange={handleImageChange}
          />
        </Box>
      ) : (
        <Box
          w={"500px"}
          h={"446px"}
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
          onClick={() => handleImageClick()}
        >
          <Icon as={IoCameraOutline} boxSize={20} top={26} right={27.5} />
          <Text>写真を撮る</Text>
          <Input
            type="file"
            ref={fileInputRef}
            display={"none"}
            onChange={handleImageChange}
          />
        </Box>
      )}
    </>
  );
};
