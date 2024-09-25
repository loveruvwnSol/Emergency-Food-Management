import { Box } from "@chakra-ui/react";
import Header from "../components/organisms/Base/Header";
import SidebarItems from "../components/organisms/Base/SidebarItems";
import { FoodItemList } from "../components/organisms/Base/FoodItemList";
import { Widget } from "../components/molecules/Home/Widget";

export const Home = () => {
  return (
    <Box>
      <Header />
      <Box display={"flex"}>
        <SidebarItems />
        <Box display={"flex"} flexDirection={"column"} w={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <FoodItemList title="非常食一覧" />
            <Widget />
          </Box>
          <Box display={"flex"}>
            <FoodItemList title="消費期限が1年以内の非常食" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
