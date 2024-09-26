import { Box, Icon, Input } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

const SearchItems = () => {
  return (
    <Box
      w={'460px'}
      mb={'30px'}
      position={'relative'}
      ml={'240px'}
    >
      <Box
        w={'400px'}
        m={'0 auto'}
      >
        <Input
          placeholder='検索'
          w={'400px'}
        />
      </Box>
      <Icon
        as={CiSearch}
        boxSize={'28px'}
        position={'absolute'}
        top={1}
        right={0}
        cursor={'pointer'}
        _hover={{ opacity: '50%' }}
      />
    </Box>
  );
};

export default SearchItems;
