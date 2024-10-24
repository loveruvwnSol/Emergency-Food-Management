import { Box, Text } from '@chakra-ui/react';
import IconSettings from '../../molecules/Settings/IconSettings';
import NameSettings from '../../molecules/Settings/NameSettings';
import GoalSettings from './GoalSettings';

const UserSettings = () => {
  return (
    <Box w={'100%'}>
      <Text
        fontSize={'24px'}
        fontWeight={'bold'}
      >
        ユーザー設定
      </Text>
      <Box
        ml={6}
        w={'100%'}
      >
        <Text
          fontSize={'18px'}
          fontWeight={'medium'}
          color={'#000000'}
          opacity={'50%'}
          mt={12}
        >
          プロフィール
        </Text>
        <Box mt={8}>
          <IconSettings />
          <NameSettings />
        </Box>

        <Box>
          <Text
            fontSize={'18px'}
            fontWeight={'medium'}
            color={'#000000'}
            opacity={'50%'}
            mt={14}
          >
            目標備蓄量
          </Text>
          <Text
            fontSize={'14px'}
            fontWeight={'medium'}
            color={'#000000'}
            opacity={'50%'}
            ml={4}
          >
            ※最低3日分備蓄することが推奨されています
          </Text>
          <GoalSettings />
        </Box>
      </Box>
    </Box>
  );
};

export default UserSettings;
