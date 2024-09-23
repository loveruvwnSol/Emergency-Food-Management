import { Box, Text } from '@chakra-ui/react';
import SettingNumber from '../../molecules/setting/SettingNumber';
import NameSetting from '../../molecules/setting/NameSetting';
import IconSetting from '../../molecules/setting/IconSetting';

const UserSetting = () => {
  return (
    <Box w={'100%'}>
      <Text
        fontSize={'24px'}
        fontWeight={'bold'}
      >
        ユーザー設定
      </Text>
      <Box
        ml={10}
        w={'100%'}
      >
        <Text //プロフィール設定
          fontSize={'18px'}
          fontWeight={'medium'}
          color={'#000000'}
          opacity={'50%'}
          mt={12}
        >
          プロフィール
        </Text>
        <Box mt={8}>
          <IconSetting />
          <NameSetting />
        </Box>

        <Box>
          <Text //目標備蓄量設定
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
          <SettingNumber />
        </Box>
      </Box>
    </Box>
  );
};

export default UserSetting;
