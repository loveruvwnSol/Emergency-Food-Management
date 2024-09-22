import { Box, Icon, Input, Text } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

const SearchMember = () => {
  return (
    <Box
      mb={'30px'}
      position={'relative'}
    >
      <Box
        w={'400px'}
        m={'0 auto'}
      >
        <Text fontSize={'16px'}>家族を検索</Text>
        <Input
          placeholder='鈴木太郎'
          w={'400px'}
        />
      </Box>
      <Icon
        as={CiSearch}
        boxSize={'28px'}
        position={'absolute'}
        top={7}
        right={'15.5rem'}
        cursor={'pointer'}
        _hover={{ opacity: '50%' }}
      />
    </Box>
  );
};

export default SearchMember;
