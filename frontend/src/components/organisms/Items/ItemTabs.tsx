import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import StockItemList from '../../molecules/Items/StockItemList';

const ItemTabs = () => {
  return (
    <Box>
      <Tabs>
        <TabList
          w={'210px'}
          gap={2}
          color={'#808080'}
          fontSize={'16px'}
          borderWidth={'10px'}
          border={'none'}
          borderBottom={'1px solid #d7d7d7'}
        >
          <Tab _selected={{ color: '#FB8B24' }}>全て</Tab>
          <Tab _selected={{ color: '#FB8B24' }}>食料</Tab>
          <Tab _selected={{ color: '#FB8B24' }}>飲料</Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          w={'100%'}
          height='2px'
          bg='#FB8B24'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel>
            <StockItemList //全てのタイプを表示
            />
          </TabPanel>
          <TabPanel>
            <StockItemList //食料を表示
            />
          </TabPanel>
          <TabPanel>
            <StockItemList //飲料を表示
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ItemTabs;
