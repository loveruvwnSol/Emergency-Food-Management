import { Box, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';

const NotificationSetting = () => {
  return (
    <Box w={'100%'}>
      <Text
        fontSize={'24px'}
        fontWeight={'bold'}
      >
        通知設定
      </Text>
      <FormControl>
        <Box
          display={'flex'}
          alignItems={'center'}
          mt={'80px'}
        >
          <FormLabel
            htmlFor='limit'
            fontSize={'18px'}
            fontWeight={'semibold'}
          >
            消費期限が近い通知
          </FormLabel>
          <Switch
            id='limit'
            size='lg'
            mb={2}
            colorScheme='orange'
            defaultChecked
          />
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          mt={'30px'}
        >
          <FormLabel
            htmlFor='notenough'
            fontSize={'18px'}
            fontWeight={'semibold'}
          >
            備蓄量が足りない通知
          </FormLabel>
          <Switch
            id='notenough'
            size='lg'
            mb={2}
            colorScheme='orange'
            defaultChecked
          />
        </Box>
      </FormControl>
    </Box>
  );
};

export default NotificationSetting;
