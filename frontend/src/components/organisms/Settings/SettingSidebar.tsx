import { Box, Text } from '@chakra-ui/react';
import UserTab from '../../molecules/Settings/UserTab';
import NotificationTab from '../../molecules/Settings/NotificationTab';

type SettingSidebarProps = {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingSidebar: React.FC<SettingSidebarProps> = ({ isToggle, setIsToggle }) => {
  return (
    <Box
      w={'320px'}
      h={'100%'}
      mr={12}
      position={'relative'}
    >
      <Box
        w={0.1}
        h={'100vh'}
        borderRight={'1px solid #808080'}
        position={'absolute'}
        top={'-120px'}
        right={-0.5}
      ></Box>
      <Text
        fontSize={'24px'}
        fontWeight={'bold'}
        mb={10}
      >
        設定
      </Text>

      <UserTab
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      />
      <NotificationTab
        isToggle={isToggle}
        setIsToggle={setIsToggle}
      />
    </Box>
  );
};

export default SettingSidebar;
