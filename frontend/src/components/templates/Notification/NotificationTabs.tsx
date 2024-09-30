import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import LowStock from '../../organisms/Notification/LowStock';
import InviteNotice from '../../organisms/Notification/InviteNotice';
import ExpiryItems from '../../organisms/Notification/ExpiryItems';

const NotificationTabs = () => {
  return (
    <Box>
      <Tabs>
        <TabList
          w={'320px'}
          gap={2}
          color={'#808080'}
          fontSize={'16px'}
          borderWidth={'10px'}
          border={'none'}
          borderBottom={'1px solid #d7d7d7'}
        >
          <Tab _selected={{ color: '#FB8B24' }}>備蓄量不足</Tab>
          <Tab _selected={{ color: '#FB8B24' }}>消費期限間近</Tab>
          <Tab _selected={{ color: '#FB8B24' }}>通知</Tab>
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
            <LowStock />
          </TabPanel>
          <TabPanel>
            <ExpiryItems />
          </TabPanel>
          <TabPanel>
            <InviteNotice />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default NotificationTabs;
