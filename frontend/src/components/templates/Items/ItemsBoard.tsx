import { Box } from '@chakra-ui/react';
import React from 'react';
import SearchItems from '../../molecules/Items/SearchItems';
import TypeTabs from '../../organisms/Items/TypeTabs';

const ItemsBoard = () => {
  return (
    <Box w={'100%'}>
      <SearchItems />
      <TypeTabs />
    </Box>
  );
};

export default ItemsBoard;
