import { Box } from '@chakra-ui/react';
import SearchItems from '../../molecules/Items/SearchItems';
import ItemTabs from '../../organisms/Items/ItemTabs';

const ItemsBoard = () => {
  return (
    <Box w={'100%'}>
      <SearchItems />
      <ItemTabs />
    </Box>
  );
};

export default ItemsBoard;
