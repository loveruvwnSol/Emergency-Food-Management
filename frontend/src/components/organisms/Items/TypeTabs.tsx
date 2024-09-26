import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TypeStockItems from '../../molecules/Items/TypeStockItems';

const TypeTabs = () => {
  return (
    <Box>
      <Tabs>
        <TabList
          w={'16%'}
          color={'#808080'}
        >
          <Tab _selected={{ color: '#FB8B24' }}>全て</Tab>
          <Tab _selected={{ color: '#FB8B24' }}>食料</Tab>
          <Tab _selected={{ color: '#FB8B24' }}>飲料</Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          height='2px'
          bg='#FB8B24'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel>
            <TypeStockItems //全てのタイプを表示
            />
          </TabPanel>
          <TabPanel>
            <TypeStockItems //食料を表示
            />
          </TabPanel>
          <TabPanel>
            <TypeStockItems //飲料を表示
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TypeTabs;
