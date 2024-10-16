import Header from "../components/organisms/Base/Header";
import { Box, Button, Text } from "@chakra-ui/react";
import SidebarItems from "../components/organisms/Base/SidebarItems";
import FamilyContents from "../components/templates/Family/FamilyContents";
import { useFamily } from "../hooks/family";

const Family = () => {
  const [{ familyMembers, CreateNewFamily }] = useFamily();

  if (!familyMembers) {
    return <Text>loading family...</Text>;
  }

  return (
    <>
      <Header title={"家族"}/>
      <Box display={"flex"}>
        <SidebarItems />
        {familyMembers.length !== 0 ? (
          <FamilyContents familyMembers={familyMembers} />
        ) : (
          <Box
            w={"1100px"}
            h={"690px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"36px"} fontWeight={"bold"} mb={"48px"}>
              家族がいません
            </Text>
            <Button
              color={"#fff"}
              bgColor={"#FB8B24"}
              w={"180px"}
              h={"60px"}
              borderRadius={"25px"}
              border={"none"}
              fontSize={"16px"}
              fontWeight={"bold"}
              cursor={"pointer"}
              _hover={{ bgColor: "#ffa959" }}
              onClick={() => CreateNewFamily()}
            >
              新しい家族を作る
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Family;
