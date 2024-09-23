import { Box, Text } from '@chakra-ui/react';
import UserActive from '../../molecules/setting/UserActive';
import NotificationActive from '../../molecules/setting/NotificationActive';

type SettingSidebarProps = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingSidebar: React.FC<SettingSidebarProps> = ({ toggle, setToggle }) => {
  return (
    <Box
      w={'320px'}
      h={'100%'}
      // borderRight={'1px solid #808080'}
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

      <UserActive
        toggle={toggle}
        setToggle={setToggle}
      />
      <NotificationActive
        toggle={toggle}
        setToggle={setToggle}
      />
    </Box>
  );
};

export default SettingSidebar;
