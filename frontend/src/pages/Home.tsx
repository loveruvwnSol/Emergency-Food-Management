import { Box } from '@chakra-ui/react';
import Header from '../components/organisms/Base/Header';
import SidebarItems from '../components/organisms/Base/SidebarItems';

import { Widget } from '../components/molecules/Home/Widget';
import { HomeStockItemList } from '../components/organisms/Home/HomeStockItemList';

export const Home = () => {
  return (
    <Box>
      <Header />
      <Box display={'flex'}>
        <SidebarItems />
        <Box
          display={'flex'}
          flexDirection={'column'}
          w={'100%'}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
          >
            <HomeStockItemList title='非常食一覧' />
            <Widget />
          </Box>
          <Box display={'flex'}>
            <HomeStockItemList title='消費期限が1年以内の非常食' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
