import { Box, Icon, Input, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { useUser } from "../../../hooks/user";

const IconSettings = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [{ user, UpdateUserIcon }] = useUser();
  const [previewIcon, setPreviewIcon] = useState<string | null>(
    user?.icon_url || null
  );

  useEffect(() => {
    if (user && user.icon_url) {
      setPreviewIcon(user.icon_url);
    }
  }, [user]);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleIconChange = async (
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
        await UpdateUserIcon(file);
      } catch (error) {
        console.error("アイコンのアップロードに失敗しました", error);
      }
    }
  };

  return (
    <Box
      w={"100px"}
      h={"100px"}
      borderRadius={"50%"}
      position={"relative"}
      cursor={"pointer"}
      _hover={{ opacity: "50%" }}
      onClick={handleIconClick}
    >
      {previewIcon ? (
        <Image
          src={previewIcon}
          alt="User Icon"
          w={"100%"}
          h={"100%"}
          borderRadius={"50%"}
          objectFit={"cover"}
        />
      ) : (
        <Box
          w={"100px"}
          h={"100px"}
          bgColor={!previewIcon ? "#d3d3d3" : "transparent"}
          borderRadius={"50%"}
          border={"1px solid #000"}
          position={"relative"}
          cursor={"pointer"}
          _hover={{ opacity: "50%" }}
        >
          <Icon
            as={IoCameraOutline}
            position={"absolute"}
            boxSize={"46px"}
            top={26}
            right={27.5}
          />
        </Box>
      )}
      <Input
        type="file"
        ref={fileInputRef}
        display={"none"}
        accept="image/*"
        onChange={handleIconChange}
      />
    </Box>
  );
};

export default IconSettings;
