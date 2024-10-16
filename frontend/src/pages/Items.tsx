import { Box } from '@chakra-ui/react';
import ItemsBoard from '../components/templates/Items/ItemsBoard';
import SidebarItems from '../components/organisms/Base/SidebarItems';
import Header from '../components/organisms/Base/Header';

const Items = () => {
  return (
    <>
      <Header title={"一覧"}/>
      <Box display={'flex'}>
        <SidebarItems />
        <ItemsBoard />
      </Box>
    </>
  );
};

export default Items;
